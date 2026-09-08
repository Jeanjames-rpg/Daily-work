import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request: Request, context: {params: Promise<{id: string}>;}) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("session");

        if (!session) {
            return NextResponse.json(
                { error: "You must be logged in"},
                {status: 401}
            );
        }

        const payload = await verifySession(session.value);

        if (!payload) {
            return NextResponse.json(
                {error: "Invalid or expired session."},
                { status: 401}
            );
        }

        const {id} = await context.params;

        const orderId = Number(id);

        if (!Number.isInteger(orderId)) {
            return NextResponse.json(
                {error: "Invalid order ID."},
                { status: 400 }
            );
        }

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId: payload.userId,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order) {
            return NextResponse.json(
                { error : "Order not found."},
                {status: 404},
            );
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Order detail error:", error);

        return NextResponse.json(
            {error: "Failed to fetch order."},
            {status: 500 }
        );
    }   
}