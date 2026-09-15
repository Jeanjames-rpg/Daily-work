import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { use } from "react";


async function checkAdmin() {
    const user = await getCurrentUser();

    if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
        return null;
    }

    return user;
}


// Update PRODUCT 
export async function PATCH(request: Request,
    context: {
        params: Promise<{ id: string }>;
    }
) {
    try {
        const user = await checkAdmin();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 403 }
            );
        }

        const {id} = await context.params;
        const productId = Number(id);

        if (!Number.isInteger(productId)) {
            return NextResponse.json(
                { error: "Invalid product ID."},
                { status: 400 }
            );
        }

        const body = await request.json();

        const {
            title,
            description,
            price,
            image,
            stock,
            // category,
            categoryId,
        } = body;

        if (
            !title || !description || price === undefined || !image || stock === undefined || !categoryId
        ) {
            return NextResponse.json(
                {error: "All fields are required."},
                {status: 400}
            );
        }

        const product = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                title,
                description,
                price: Number(price),
                image,
                stock: Number(stock),
                category: "",
                categoryId: Number(categoryId),
            },
        });

        return NextResponse.json({
            message: "Product updated successfully.",
            product,
        });
    } catch (error) {
        console.error("Update product error:", error);

        return NextResponse.json(
            { error: "Failed to update product."},
            { status: 500 }
        );
    }
}


// Delete product 
export async function DELETE(request: Request,
    context: {
        params: Promise<{ id: string }>;
    }
) {
    try {
        const user = await checkAdmin();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 403 }
            );
        }

        const {id} = await context.params;
        const productId = Number(id);

        if (!Number.isInteger(productId)) {
            return NextResponse.json(
                { error: "Invalid product ID."},
                { status: 400 }
            );
        }

        await prisma.product.delete({
            where: {
                id: productId,
            },
        });

        return NextResponse.json({
            message: "Product deleted successfully.",
        });
    } catch (error) {
        console.error("Delete product error:", error);

        return NextResponse.json(
            { error: "Failed to delete product."},
            {status: 500 }
        );
    }
}