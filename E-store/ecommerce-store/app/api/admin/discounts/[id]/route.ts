import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";


type DiscountKind = "coupon" | "promotion";

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string}> }
) {
    try {
        const user = await getCurrentUser();

        if (
            !user ||
            (user.role !== "ADMIN" && user.role !== "OWNER")
        ) {
            return NextResponse.json(
                { error: "Forrbidden" },
                { status: 403 }
            );
        }

        const { id: idParam } = await context.params;
        const id = Number(idParam);

        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json(
                { error: "Invalid discount ID"},
                { status: 400}
            );
        }

        const body = await request.json();
        const { kind, isActive } = body as {
            kind: DiscountKind;
            isActive: boolean;
        };

        if (
            (kind !== "coupon" && kind !== "promotion") ||
            typeof isActive !== "boolean"
        ) {
            return NextResponse.json(
                { error: "Vaild kind and isActive are required"},
                { status: 400 }
            );
        }

        const discount = 
            kind === "coupon"
                ? await prisma.coupon.update({
                    where: { id },
                    data: { isActive },
                })
                : await prisma.promotion.update({
                    where: { id },
                    data: { isActive },
                });

        return NextResponse.json({ discount });        
    } catch (error) {
        console.error("Discount status update failed:", error);

        return NextResponse.json(
            { error: "Discount not found or update failed:"},
            { status: 404 }
        );
    }
}