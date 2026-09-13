import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const user = await getCurrentUser();

        // owner only
        if (!user || user.role !== "OWNER") {
            return NextResponse.json(
                { error:"Unauthorized"},
                { status: 403}
            );
        } 

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error("Owner users error:", error);

        return NextResponse.json(
            {error: "Failed to fetch users."},
            { status: 500 }
        );
    }
}