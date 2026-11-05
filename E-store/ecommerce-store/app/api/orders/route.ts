import { verifySession } from "@/lib/auth";
import { calculatePrice } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request:Request) {
    let reservedOrderId: number | null = null;

    try{
        // get session

        const cookieStore =await cookies();
        const session = cookieStore.get("session");

        if (!session) {
            return NextResponse.json(
                { error :"You must be logged in."},
                { status: 401 }
            );
        }

        // verify session

        const payload = await verifySession(session.value);

        if (!payload) {
            return NextResponse.json(
                { error: "Invalid or expired session."},
                {status: 401}
            );
        }

        const userId = payload.userId;

        // get request body 
        
        const body = await request.json();
        const { items, couponCode } = body;

        if (
            couponCode !== undefined &&
            (typeof couponCode !== "string" || couponCode.length > 100) 
        ) {
            return NextResponse.json(
                { error: "Invalid coupon code."},
                { status: 400 }
            );
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                {error: "Your cart is empty."},
                {status: 400}
            );
        }

        for (const item of items) {
            if (
                !Number.isInteger(item.variantId) ||
                item.variantId <= 0 
            ) {
                return NextResponse.json(
                    { error: "Invalid variant."},
                    { status: 400 }
                );
            }

            if (
                !Number.isInteger(item.quantity) ||
                item.quantity <= 0
            ) {
                return NextResponse.json(
                    { error: "Invalid quantity."},
                    { status: 400 }
                );
            }
        }

        // Get  PRODUCTS FROM DB 
        const variantIds = items.map(
            (item: { variantId: number}) => item.variantId
        );

        if (new Set(variantIds).size !== variantIds.length) {
            return NextResponse.json(
                { error: "Duplicate product variants are not allowed."},
                { status: 400 }
            );
        }

        const variants = await prisma.productVariant.findMany({
            where: {
                id: {
                    in: variantIds,
                },
            },
            include: {
                product: true,
            },
        });

        if (variants.length !== variantIds.length) {
            return NextResponse.json(
                {error: "One or more products were not found."},
                {status: 400}
            );
        }

        // calculate total and prepare order items 

        // let total = 0;
        // const quantities = new Map<number, number>();

        // for (const item of items) {
        //     if (quantities.has(item.variantId)) {
        //         return NextResponse.json(
        //             { error: "Duplicate product variants are not allowed."},
        //             { status: 400 }
        //         );
        //     }

        //     quantities.set(item.variantId, item.quantity);
        // }

        let subtotal = 0;

        const orderItems: {
            productId: number;
            variantId: number;
            quantity: number;
            price: (typeof variants)[number]["price"];
        }[] = [];

        for (const item of items) {
            const variant = variants.find(
                (variant) => variant.id === item.variantId
            );

            if (!variant) {
                return NextResponse.json(
                    { error: "Product not found."},
                    {status: 400}
                );
            }

            if ( !Number.isInteger(item.quantity) || item.quantity <= 0) {
                return NextResponse.json(
                    { error: "Invalid quantity."},
                    { status: 400}
                );
            }

            if (item.quantity > variant.stock) {
                return NextResponse.json(
                    { error: `${variant.product.title} does not have enough stock.`,},
                    {status: 400}
                );
            }

            subtotal += Number(variant.price) * item.quantity;

            orderItems.push({
                productId: variant.productId,
                variantId: variant.id,
                quantity: item.quantity,
                price: variant.price,

            });
        }

        let pricing;

        try {
            pricing = await calculatePrice(subtotal, couponCode); 
        } catch (error) {
            return NextResponse.json(
                {
                    error:
                        error instanceof Error
                            ? error.message
                            : "Unable to calculate your order price.",
                },
                { status: 400 }
            );
        }

        const total = Number(pricing.total.toFixed(2));
        const discount = Number(pricing.totalDiscount.toFixed(2));
        const finalSubtotal = Number(subtotal.toFixed(2));

        if (!Number.isFinite(total) || total <= 0) {
            return NextResponse.json(
                { error: "Invalid order total. "},
                { status: 400 }
            );
        }

        // Razorpay needs money in paise 
        const amountInPaise = Math.round(total * 100);


        // . Reserve stock and create pending database order
        const order = await prisma.$transaction(async (tx) => {
            // const newOrder = await tx.order.create({
            //     data: {
            //         userId,
            //         total,
            //         items: {create: orderItems,},
            //         subtotal: finalSubtotal,
            //         discount,
            //         couponCode: pricing.appliedCoupon,

            //     },
            // });

            
            for (const item of items) {
                const updatedVariant = await tx.productVariant.updateMany({
                    where: {
                        id: item.variantId,
                        stock: {
                            gte: item.quantity,
                        },
                    },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });

                if (updatedVariant.count === 0) {
                    throw new Error(
                        `Not enough stock for product ${item.variantId}`
                    );
                }
            }

            return tx.order.create({
                data: {
                    userId,
                    total,
                    subtotal: finalSubtotal,
                    discount,
                    couponDiscount: pricing.couponDiscount,
                    couponCode: pricing.appliedCoupon ?? null,
                    paymentStatus: "PENDING",
                    status: "PENDING",
                    items: {
                        create: orderItems,
                    },
                },
            });
        });

        reservedOrderId = order.id;

        // Create Razorpay order 
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `order_${order.id}`,
        });

        // Save Razorpay order id 
        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                razorpayOrderId: razorpayOrder.id,
            },
        });

        return NextResponse.json(
            {
                message: "Payment order created successfully.",

                orderId: order.id,

                razorpay: {
                    orderId: razorpayOrder.id,
                    amount: amountInPaise,
                    currency: "INR",
                    key: process.env.RAZORPAY_KEY_ID,
                },

                pricing: {
                    subtotal: finalSubtotal,
                    automaticDiscount: Number(
                        pricing.automaticDiscount.toFixed(2)
                    ),
                    couponDiscount: Number(
                        pricing.couponDiscount.toFixed(2)
                    ),
                    discount,
                    couponCode: pricing.appliedCoupon,
                    total,
                },
            },
            {status: 201}
        );
    }catch (error) {
        console.error("Order creation error.",error);

        // Release reserved stock if Razorpay order creation fails 
        if (reservedOrderId !== null) {
            try {
                await prisma.$transaction(async (tx) => {
                    const cancelled = await tx.order.updateMany({
                        where: {
                            id: reservedOrderId!,
                            paymentStatus: "PENDING",
                            status: "PENDING",
                        },
                        data: {
                            paymentStatus: "FAILED",
                            status: "CANCELLED",
                        },
                    });

                    if (cancelled.count === 1) {
                        const failedOrder = await tx.order.findUnique({
                            where: { id: reservedOrderId! },
                            include: { items: true },
                        });

                        if (failedOrder) {
                            
                            for (const item of failedOrder.items) {
                                await tx.productVariant.update({
                                    where: { id: item.variantId },
                                    data: {
                                        stock: {
                                            increment: item.quantity,
                                        },
                                    },
                                });
                            }
                        }
                    }
                });
            } catch (cleanupError) {
                console.error("Stock release error:", cleanupError);
            }
        }

        return NextResponse.json(
            { error: "Unable to create payment order.",},
            { status: 500}
        );
    }
}


export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("session");

        if (!session) {
            return NextResponse.json(
                {error: "You must be logged in."},
                { status: 401}
            );
        }

        const payload = await verifySession(session.value);

        if (!payload) {
            return NextResponse.json(
                { error: "Invalid or expired session."},
                {status: 401}
            );
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: payload.userId,
            },
            include: {
                items: {
                    include: {
                        product: true,
                        variant: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({orders});
    } catch (error) {
        console.error("Fetching orders error:", error);

        return NextResponse.json(
            { error: "Failed to fetch orders."},
            {status: 500}
        );
    }
}