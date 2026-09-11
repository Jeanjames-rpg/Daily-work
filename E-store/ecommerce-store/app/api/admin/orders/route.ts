import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 403 }
            );
        }

        const orders = await prisma.order.findMany({
            include:{
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        
        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Admin orders error:", error);

        return NextResponse.json(
            {error: "Failed to fetch orders."},
            { status: 500}
        );
    }
}