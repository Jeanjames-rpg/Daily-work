import { verifySession } from "@/lib/auth";
import { calculatePrice } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request:Request) {
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
        const quantities = new Map<number, number>();

        for (const item of items) {
            if (quantities.has(item.variantId)) {
                return NextResponse.json(
                    { error: "Duplicate product variants are not allowed."},
                    { status: 400 }
                );
            }

            quantities.set(item.variantId, item.quantity);
        }

        let subtotal = 0;

        const orderItems: {
            productId: number;
            variantId: number;
            quantity: number;
            price: typeof variants[number]["price"];
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


            // const price = Number(variant.price);

            // total += price * item.quantity;

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

        // create order + order items + update stock 
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    total,
                    items: {create: orderItems,},
                    subtotal: finalSubtotal,
                    discount,
                    couponCode: pricing.appliedCoupon,

                },
            });

            // for (const item of items) {
            //     await tx.product.update({
            //         where: {
            //             id: item.productId,
            //             stock: {
            //                 gte: item.quantity,
            //             },
            //         },
            //         data: {
            //             stock: { decrement: item.quantity,},
            //         },
            //     });
            // }

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

            return newOrder;
        });

        return NextResponse.json(
            {
                message: "Order placed successfully.",
                orderId: order.id,
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

        return NextResponse.json(
            { error: "Something went wrong while placing the order.",},
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