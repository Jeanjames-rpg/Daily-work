import { verifySession } from "@/lib/auth";
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
        const { items } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                {error: "Your cart is empty."},
                {status: 400}
            );
        }

        // Get  PRODUCTS FROM DB 
        const productIds = items.map(
            (item: { productId: number}) => item.productId
        );

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        if (products.length !== productIds.length) {
            return NextResponse.json(
                {error: "One or more products were not found."},
                {status: 400}
            );
        }

        // calculate total and prepare order items 

        let total = 0;

        const orderItems: {
            productId: number;
            quantity: number;
            price: typeof products[number]["price"];
        }[] = [];

        for (const item of items) {
            const product = products.find(
                (product) => product.id === item.productId
            );

            if (!product) {
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

            if (item.quantity > product.stock) {
                return NextResponse.json(
                    { error: `${product.title} does not have enough stock.`,},
                    {status: 400}
                );
            }

            const price = Number(product.price);

            total += price * item.quantity;

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,

            });
        }

        // create order + order items + update stock 
        const order = await prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    total,
                    items: {create: orderItems,},

                },
            });

            for (const item of items) {
                await tx.product.update({
                    where: {
                        id: item.productId,
                    },
                    data: {
                        stock: { decrement: item.quantity,},
                    },
                });
            }

            return newOrder;
        });

        return NextResponse.json(
            {
                message: "Order placed successfully.",
                orderId: order.id,
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