import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("session");

        if (!session) {
            return NextResponse.json(
                { error: "Not authenticated."},
                { status: 401}
            );
        }

        const payload = await verifySession(session.value);

        if (!payload) {
            return NextResponse.json(
                { error: "Invalid or expired session."},
                { status: 401}
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId,},
            select: { id: true, name: true, email: true,},
        });

        if (!user) {
            return NextResponse.json(
                {error: "User not found."},
                { status: 404}
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Auth check error:", error);

        return NextResponse.json(
            {error: "Something went wrong."},
            { status: 500}
        );
    }
}