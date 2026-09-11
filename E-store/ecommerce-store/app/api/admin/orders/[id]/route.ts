import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


const allowedStatuses = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
];

export async function PATCH(request: Request, 
    context: {
        params: Promise<{ id: string}>;
    }
) {
    try {
        const user = await getCurrentUser();

        if (
            !user || (user.role !== "ADMIN" && user.role !== "OWNER")
        ) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 403 }
            );
        }

        const {id} = await context.params;
        const orderId = Number(id);

        if (!Number.isInteger(orderId)) {
            return NextResponse.json(
                { error: "Invalid order ID."},
                { status: 400 }
            );
        }

        const body = await request.json();
        const { status } = body;

        if (!allowedStatuses.includes(status)) {
            return NextResponse.json(
                { error: "Invalid order status."},
                { status: 400 }
            );
        }

        const order = await prisma.order.update({
            where: { id: orderId,},
            data: { status,},
        });

        return NextResponse.json({
            message: "Order status updated successfully.",
            order,
        });
    } catch (error) {
        console.error("Update order status error:", error);

        return NextResponse.json(
            { error: "Failed to update order status."},
            { status: 500 }
        );
    }
}