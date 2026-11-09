import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    try {

        const cookieStore = await cookies();
        const session = cookieStore.get("session");

        if (!session) {
            return NextResponse.json(
                { message: "Please log in."},
                { status: 401 }
            );
        }

        const payload = await verifySession(session.value);

        if (!payload) {
            return NextResponse.json(
                { message: "Invalid session."},
                { status: 401 }
            );
        }

        const userId = payload.userId;

        const body = await request.json();

        console.log("Backend recieved:", body);

        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = body;

        const recieved = {
            orderId: !!orderId,
            razorpay_order_id: !!razorpay_order_id,
            razorpay_payment_id: !!razorpay_payment_id,
            razorpay_signature: !!razorpay_signature,
        };

        console.log("Payment details received:", recieved);

        if (Object.values(recieved).some((value) => !value)) {
            return NextResponse.json(
                {
                    message: "Missing payment details.",
                    recieved,
                },
                {status: 400 }
            );
        }

        // console.log("Verification request:", {
        //     orderId,
        //     razorpay_order_id,
        //     razorpay_payment_id,
        //     hasSignature: !!razorpay_signature,
        // });

        // if (
        //     !orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature
        // ) {
        //     return NextResponse.json(
        //         { message: "Missing payment details."},
        //         { status: 400 }
        //     );
        // }

        // find order blonging to this user 
        const order = await prisma.order.findFirst({
            where: {
                id: Number(orderId),
                userId,
            },
        });

        if (!order || !order.razorpayOrderId) {
            return NextResponse.json(
                { message: "Order not found."},
                { status: 404 }
            );
        }

        if (order.razorpayOrderId !== razorpay_order_id) {
            return NextResponse.json(
                { message: "Order ID mismatch."},
                { status: 400 }
            );
        }

        // verifying signature 
        const secret = process.env.RAZORPAY_KEY_SECRET;

        if(!secret) {
            throw new Error("Razorpay secret is not configured.");
        }

        const expectedSignature = createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        
        const expectedBuffer = Buffer.from(expectedSignature, "hex");
        const recievedBuffer = Buffer.from(razorpay_signature, "hex");

        if ( expectedBuffer.length !== recievedBuffer.length || !timingSafeEqual(expectedBuffer, recievedBuffer)) {
            return NextResponse.json(
                { message: "Invalid payment signature."},
                { status: 400 }
            );
        }

        // fetching payment from razorpay 
        const payment = await razorpay.payments.fetch(
            razorpay_payment_id
        );

        if (
            payment.order_id !== razorpay_order_id ||
            payment.amount !== Math.round(Number(order.total) * 100) ||
            payment.currency !== "INR" ||
            payment.status !== "captured"
        ) {
            return NextResponse.json(
                { message: "Payment is not captured or details dont match."},
                { status: 400 }
            );
        }

               // 6. Update the order only once
        const result = await prisma.$transaction(async (tx) => {
            const updated = await tx.order.updateMany({
                where: {
                    id: order.id,
                    userId,
                    razorpayOrderId: razorpay_order_id,
                    paymentStatus: "PENDING",
                },
                data: {
                    paymentStatus: "PAID",
                    razorpayPaymentId: razorpay_payment_id,
                    status: "CONFIRMED",
                },
            });

            if (updated.count === 0 ) {
                const existingOrder = await tx.order.findUnique({
                    where: { id: order.id },
                });

                if (
                    existingOrder?.paymentStatus === "PAID" &&
                    existingOrder.razorpayPaymentId === razorpay_payment_id
                ) {
                    return "already-paid";
                }

                throw new Error("Order has already been processed.");
            }

            if (order.couponCode) {
                const coupon = await tx.coupon.findUnique({
                    where: { code: order.couponCode },
                });

                if (coupon) {
                    await tx.couponRedemption.create({
                        data: {
                            couponId: coupon.id,
                            userId,
                            orderId: order.id,
                            discount: order.couponDiscount,
                        },
                    });

                    await tx.coupon.update({
                        where: {id: coupon.id},
                        data: {
                            usedCount: { increment: 1 },
                        },
                    });
                }
            }
            return "paid";
        });

        return NextResponse.json({
            success: true,
            message:
                result === "already-paid"
                    ? "Payment was already verified."
                    : "Payment verified successfully.",
            orderId: order.id,
        });
    } catch (error) {
        console.error("Payment verification error:", error);

        return NextResponse.json(
            { message: "Payment verification failed. "},
            { status: 500 }
        );
    }
}