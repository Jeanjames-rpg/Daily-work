import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";
import { use } from "react";



export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 401 }
            );
        }

        const cart = await prisma.cart.findUnique({
            where: {
                userId: user.id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            return NextResponse.json({
                items: [],
            });
        }

        return NextResponse.json(cart);
    } catch (error) {
        console.error("Fetch cart error:", error);

         return NextResponse.json(
            { error: "Failed to fetch cart" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized "},
                { status: 401 }
            );
        }

        const body = await request.json();

        const productId = Number(body.productId);
        const quantity = Number(body.quantity);

        if (!productId || !quantity || quantity < 1) {
            return NextResponse.json(
                { error: "Invalid product or quantity" },
                { status: 400 }
            );
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        if (product.stock < quantity) {
            return NextResponse.json(
                { error: "Not enough stock."},
                { status: 400}
            );
        }

        const cart = await prisma.cart.upsert({
            where: {
                userId: user.id,
            },
            create: {
                userId: user.id,
            },
            update: {},
        });

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > product.stock) {
                return NextResponse.json(
                    { error: "Quantity exceeds available stock" },
                    { status: 400 }
                );
            }

            await prisma.cartItem.update({
                where: {
                    id: existingItem.id,
                },
                data: {
                    quantity: newQuantity,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }

        const updatedCart = await prisma.cart.findUnique({
            where: {
                userId: user.id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedCart);
    } catch (error) {
        console.error("Add to cart error:", error);

        return NextResponse.json(
            { error: "Failed to add item to cart"},
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {

        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 401}
            );
        }

        const body = await request.json();

        const productId = Number(body.product);
        const quantity = Number(body.quantity);

        if (!productId || !Number.isInteger(quantity) || quantity < 1) {
            return NextResponse.json(
                { error: "Invalid product or quantity"},
                { status: 400 }
            );
        }

        const cart = await prisma.cart.findUnique({
            where: {
                userId: user.id,
            },
        });

        if (!cart) {
            return NextResponse.json(
                { error: "Cart not found"},
                { status: 404 },
            );
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found"},
                { status: 404 }
            );
        }

        if (quantity > product.stock) {
            return NextResponse.json(
                { error: "Quantity exceeds available stock"},
                {status: 400}
            );
        }

        const cartItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (!cartItem) {
            return NextResponse.json(
                { error: "Cart item not found"},
                { status: 404 }
            );
        }

        await prisma.cartItem.update({
            where: {
                id: cartItem.id,
            },
            data: {
                quantity,
            },

        });

        const updatedCart = await prisma.cart.findUnique({
            where: {
                userId: user.id,
            },
            include: {
                items: {
                    include:{
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedCart);
    } catch (error) {
        console.error("Updated cart error: ",error);

        return NextResponse.json(
            { error: "Failed to update cart"},
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 401 }
            );
        }

        const body = await request.json();
        const productId = Number(body.productId);

        if (!productId) {
            return NextResponse.json(
                { error: "Invalid product"},
                { status: 400 }
            );
        }

        const cart = await prisma.cart.findUnique({
            where: {
                userId: user.id,
            },
        });

        if (!cart) {
            return NextResponse.json(
                { error: "Cart not found"},
                { status: 404 }
            );
        }

        const cartItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (!cartItem) {
            return NextResponse.json(
                { error: "Cart item not found"},
                { status: 404 },
            );
        }

        await prisma.cartItem.delete({
            where: {
                id: cartItem.id,
            },
        });

        const updatedCart = await prisma.cart.findUnique({
            where: {
                userId: user.id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedCart);
    } catch (error) {
        console.error("Delete cart item error:", error);

        return NextResponse.json(
            { error: "Failed to remove item from cart"},
            { status: 500 }
        );
    }
}