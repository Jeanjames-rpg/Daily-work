import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { use } from "react";



export async function GET() {
    const user = await getCurrentUser();

    if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
        return NextResponse.json(
            {error: "Unuthorized"},
            { status: 403}
        );
    }

    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc",},
    });

    return NextResponse.json({products});
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
        return NextResponse.json(
            {error: "Unuthorized"},
            { status: 403}
        );
    }

    const body = await request.json();

    const { title, description, price, image, stock, category,} = body;

    if (!title || !description || price === undefined || !image || stock === undefined || !category) {
        return NextResponse.json(
            {error: "All fields are required."},
            {status: 400}
        );
    }

    const product = await prisma.product.create({
        data: {
            title,
            description,
            price,
            image,
            stock: Number(stock),
            category,
        },
    });


    return NextResponse.json(
        {
            message: "Product created successfully.",
            product,
        },
        {status: 201}
    );
    } catch (error) {
        console.error("Create product error:", error);

        return NextResponse.json(
            { error: "Failed to create product."},
            { status: 500 }
        );
    }
}