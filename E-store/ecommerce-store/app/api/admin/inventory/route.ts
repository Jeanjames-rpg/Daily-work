import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        
        const cookieStore = await cookies();
        const token = cookieStore.get("session")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 401 }
            );
        }

        const session = await verifySession(token);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized "},
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: session.userId,
            },
            select: {
                role: true,
            },
        });

        if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
            return NextResponse.json(
                { error: "Forbidden"},
                { status: 403}
            );
        }

        const variants = await prisma.productVariant.findMany({
            orderBy: {
                product: {
                    title: "asc"
                },
            },
            include: {
                product: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                    },
                },
            },
        });

        return NextResponse.json(variants);

    } catch (error) {
        console.error("Inventory GET error:", error);

        return NextResponse.json(
            { error: "Failed to fetch inventory"},
            { status: 500 }
        );
    }
}