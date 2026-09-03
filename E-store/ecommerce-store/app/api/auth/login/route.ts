import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    try {
        const {email, password} = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {error: "Email and Password are required."},
                {status: 400}
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return NextResponse.json(
                {error: "Invalid email or password."},
                { status: 401}
            );
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return NextResponse.json(
                {error: "Invalid email or password."},
                { status: 401}
            );
        }

        const sessionToken = await createSession(user.id);

        const cookieStore = await cookies();

        cookieStore.set("session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return NextResponse.json(
            {
                message: "Login successful.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            }
        );
    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            {error: "Something went wrong."},
            { status: 500}
        );
    }
}