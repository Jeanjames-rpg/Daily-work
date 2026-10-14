import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



async function checkAdmin() {
    const user = await getCurrentUser();

    if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
        return null;
    }

    return user;
}


// Update PRODUCT and VARIANTS
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

        if (!Number.isInteger(productId) || productId <= 0) {
            return NextResponse.json(
                { error: "Invalid product ID."},
                { status: 400 }
            );
        }

        const body = await request.json();

        // const {
        //     title,
        //     description,
        //     price,
        //     image,
        //     stock,
        //     categoryId,
        //     variants,
        // } = body;

        const { title, description, categoryId, variants} = body;

        // Validate product details 

        // if (
        //     !title || !description || price === undefined || !image || stock === undefined || !categoryId || !Array.isArray(variants) || variants.length === 0
        // ) {
        //     return NextResponse.json(
        //         {error: "Product details and at least one variant are required."},
        //         {status: 400}
        //     );
        // }

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof description !== "string" ||
            !description.trim() ||
            !Number.isInteger(Number(categoryId)) ||
            Number(categoryId) <= 0 ||
            !Array.isArray(variants) ||
            variants.length === 0
        ) {
            return NextResponse.json(
                {
                    error : "Enter a product title, description, valid vategory, and at least one variant.",
                },
                {status: 400 }
            );
        }

        // Validate variant fields before writing to the database. 
        for (const variant of variants) {
            if (
                !variant.sku?.trim() ||
                variant.price === undefined ||
                variant.price === "" ||
                variant.stock === undefined || 
                variant.stock === "" ||
                !Number.isFinite(Number(variant.price)) ||
                Number(variant.price) < 0 ||
                !Number.isInteger(Number(variant.stock)) ||
                Number(variant.stock) < 0 ||
                typeof variant.image !== "string" ||
                !variant.image.trim()
            ) {
                return NextResponse.json(
                    { error: "Each variant needs a SKU,image, valid price, and valid stock."},
                    {status: 400}
                );
            }
        }

        const product = await prisma.$transaction(async (tx) => {
            const existingProduct = await tx.product.findUnique({
                where: { id: productId },
                include: { variants: true},
            });

            if (!existingProduct) {
                throw new Error("PRODUCT_NOT_FOUND");
            }

            const existingVariantIds = new Set(
                existingProduct.variants.map((variant) => variant.id)
            );

            // Use the first variant as the product's default values 
            const firstVariant = variants[0];

            // Update  product details 
            await tx.product.update({
                where: { id: productId},
                data: {
                    title: title.trim() ,
                    description: description.trim(),
                    price: Number(firstVariant.price),
                    image: firstVariant.image.trim(),
                    stock: Number(firstVariant.stock),
                    categoryId: Number(categoryId),
                },
            });

            // Update existing variants or  create new ones .
            for (const variant of variants) {
                const variantData =  {
                    sku: variant.sku.trim(),
                    color: 
                        typeof variant.color === "string"    
                            ? variant.color?.trim() || null
                            : null,
                    storage: 
                        typeof variant.storage === "string"
                            ? variant.storage?.trim() || null
                            : null,
                    price: Number(variant.price),
                    stock: Number(variant.stock),
                    image: variant.image?.trim() ,
                };

                if (variant.id !== undefined && variant.id !== null) {
                    const variantId = Number(variant.id);

                    if (!existingVariantIds.has(variantId)) {
                        throw new Error("INVALID_VARIANT_ID");
                    }

                    await tx.productVariant.update({
                        where: {
                            id: variantId,
                            // productId,
                        },
                        data: variantData,
                    });
                } else {
                    await tx.productVariant.create({
                        data: {
                            ...variantData,
                            productId,
                        },
                    });
                }
            }

            return tx.product.findUniqueOrThrow({
                where: { id: productId },
                include: {
                    categoryRef: true,
                    variants: true,
                },
            });
        });

        return NextResponse.json({
            message: "Product and variants updated successfully.",
            product,
        });

        
    } catch (error) {
        
        if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
            return NextResponse.json(
                { error: "Product not found."},
                { status: 404}
            );
        }

        if (error instanceof Error && error.message === "INVALID_VARIANT_ID") {
            return NextResponse.json(
                { error: "A variant does not belong to this product."},
                { status: 400 }
            );
        }

        console.error("Update product error:",error);

        return NextResponse.json(
            { error: "Failed to update product. Check the category and ensure all SKUs are unique."},
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