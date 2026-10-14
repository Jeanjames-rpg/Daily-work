import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";




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
        include: { 
            categoryRef: true,
            variants: true,
        },
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

    // const { title, description, price, image, stock, categoryId,variants,} = body;

    // if (!title || !description || price === undefined || !image || stock === undefined || !categoryId || !Array.isArray(variants) || variants.length === 0 ) {
    //     return NextResponse.json(
    //         {error: "Product and at least one variant are required."},
    //         {status: 400}
    //     );
    // }

    const { title , description, categoryId, variants} = body;

    if (!title?.trim() || !description?.trim() || !categoryId || !Array.isArray(variants) || variants.length === 0) {
        return NextResponse.json(
            { error: "Product details and at least one variant are required."},
            { status: 400 }
        );
    }

    for (const variant of variants) {
        if (
            !variant.sku?.trim() ||
            !variant.image?.trim() ||
            variant.price === "" ||
            variant.price === undefined ||
            !Number.isFinite(Number(variant.price)) ||
            Number(variant.price) < 0 ||
            variant.stock === "" ||
            variant.stock === undefined ||
            !Number.isInteger(Number(variant.stock)) ||
            Number(variant.stock) < 0
        ) {
            return NextResponse.json(
                { error: "Each variant needs an SKU, image, valid price, and valid stock."},
                { status: 400 }
            );
        }
    }

    // const product = await prisma.product.create({
    //     data: {
    //         title,
    //         description,
    //         price,
    //         image,
    //         stock: Number(stock),
    //         categoryId: Number(categoryId),

    //         variants: {
    //             create: variants.map((variant: {
    //                 sku: string;
    //                 color?: string;
    //                 storage?: string;
    //                 price: string | number;
    //                 stock: string | number;
    //                 image?: string;
    //             }) => ({
    //                 sku: variant.sku,
    //                 color: variant.color || null,
    //                 storage: variant.storage || null,
    //                 price: Number(variant.price),
    //                 stock: Number(variant.stock),
    //                 image: variant.image || null,
    //             })),
    //         }
    //     },
    //     include: {
    //         variants: true,
    //     },
    // });

    const product = await prisma.product.create({
        data: {
            title: title.trim(),
            description: description.trim(),

            // Use the first variant image as th products main image 
            image: variants[0].image,


            // Legacy product-level fields : variant values are authoritative 
            price: Number(variants[0].price),
            stock: Number(variants[0].stock),

            categoryId: Number(categoryId),

            variants: {
                create: variants.map((variant: {
                    sku: string;
                    color?: string | null;
                    storage?: string | null;
                    price: string | number;
                    stock: string | number;
                    image: string;
                }) => ({
                    sku: variant.sku.trim(),
                    color: variant.color?.trim() || null,
                    storage: variant.storage?.trim() || null,
                    price: Number(variant.price),
                    stock: Number(variant.stock),
                    image: variant.image,
                })),
            },
        },
        include: {
            categoryRef: true,
            variants: true,
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