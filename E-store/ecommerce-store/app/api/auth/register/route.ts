import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {

    try {
        const body = await request.json();

        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                {error: "All fields are required."},
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                {error: "Password must be at least 6 characters.",},
                { status: 400}

            );
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                {error: "An account with this email already exists."},
                {status: 409},
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                message: "Account created successfully.",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            {status: 201}
        );
    } catch (error) {
        console.error("Registeration error:", error);

        return NextResponse.json(
            { error: "Something went wrong.",},
            {status: 500},
        );
    }
    
}