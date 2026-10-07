import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function PATCH(
    request: Request,
    { params } : {params: Promise<{ variantId: string }> }
) {
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
            { error: "Unauthorized"},
            { status: 401 }
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
        select: {
            role: true
        },
    });

    if (!user || (user.role !== "ADMIN" && user.role !== "OWNER")) {
        return NextResponse.json(
            { error: "Forbidden"},
            { status: 403 }
        );
    }

    const { variantId } = await params;
    const id = Number(variantId);

    const body = await request.json();
    const stock = Number(body.stock);

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json(
            { error: "Invalid variant ID"},
            { status: 400 }
        );
    }

    if (!Number.isInteger(stock) || stock < 0) {
        return NextResponse.json(
            { error: "Stock must be a non-negative integer"},
            { status: 400 }
        );
    }

    const variant = await prisma.productVariant.update({
        where: {
            id,
        },
        data: {
            stock,
        },
        
    });

    return NextResponse.json(variant);

   } catch (error) {
    console.error("Inventory update error:", error);

    return NextResponse.json(
        { error: "Failed to update stock"},
        { status: 500 }
    );
   }
}