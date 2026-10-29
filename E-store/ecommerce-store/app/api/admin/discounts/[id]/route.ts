import { DiscountType, Prisma } from "@/app/generated/prisma";
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

        if(!body || typeof body !== "object" || Array.isArray(body)) {
            return NextResponse.json(
                { error: "Invalid request body"},
                { status: 400 }
            );
        }


        const { kind } = body as { kind?: DiscountKind };

        // const { kind, isActive } = body as {
        //     kind: DiscountKind;
        //     isActive: boolean;
        // };

        if (
            (kind !== "coupon" && kind !== "promotion") 
        ) {
            return NextResponse.json(
                { error: "Kind must be coupon or promotion"},
                { status: 400 }
            );
        }

        if (typeof body.isActive === "boolean" &&
            Object.keys(body).every((key) => ["kind", "isActive"].includes(key))) {

        const discount = 
            kind === "coupon"
                ? await prisma.coupon.update({
                    where: { id },
                    data: { isActive: body.isActive },
                })
                : await prisma.promotion.update({
                    where: { id },
                    data: { isActive: body.isActive },
                });

        return NextResponse.json({ discount });        
    }
    
    const allowedFields = [
        "name",
        "code",
        "type",
        "value",
        "startsAt",
        "endsAt",
        "minOrder",
        "maxDiscount",
        "usageLimit",
        "perUserLimit",
    ];

    const suppliedFields = Object.keys(body).filter(
        (key) => key !== "kind"
    );

    if (
        suppliedFields.length === 0 ||
        suppliedFields.some((key) => !allowedFields.includes(key))
    ) {
        return NextResponse.json(
            { error: "No editable fields supplied or unsupported fields included "},
            { status: 400 }
        );
    }

    if (
        body.type !== undefined &&
        body.type !== "PERCENTAGE" &&
        body.type !== "FIXED"
    ) {
          return NextResponse.json(
            { error: "Invalid discount type"},
            { status: 400 }
          );
    }

    if (body.value !== undefined) {
        const value = Number(body.value);

        if (
            !Number.isFinite(value) ||
            value <= 0 ||
            (body.type === "PERCENTAGE" && value > 100)
        ) {
            return NextResponse.json(
                { error: "Invalid discount value"},
                { status: 400 }
            );
        }
    }

    const parseAmount = (
        value: unknown,
        field: string
    ): Prisma.Decimal | null | undefined => {
        if (value === undefined) return undefined;
        if (value === null || value === "" ) return null;

        const number = Number(value);

        if (!Number.isFinite(number) || number < 0) {
            throw new Error(`${field} must be a non-negative number`);
        }

        return new Prisma.Decimal(number);
    };

    const parseDate = (
        value: unknown,
        field: string
    ): Date | null | undefined => {
        if (value === undefined) return undefined;
        if (value === null || value === "") return null;

        if (typeof value !== "string") {
            throw new Error(`Invalid ${field}`);
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            throw new Error(`Invalid ${field}`);
        }

        return date;
    };

    const startsAt = parseDate(body.startsAt, "start date");
    const endsAt = parseDate(body.endsAt, "end date");

    if (startsAt && endsAt && startsAt > endsAt) {
        return NextResponse.json(
            { error: "End date must be after start date"},
            { status: 400 }
        );
    }

    const commonData = {
        ...(body.type !== undefined && {
            type: body.type as DiscountType,
        }),
        ...(body.value !== undefined && {
            value: new Prisma.Decimal(Number(body.value)),
        }),
        ...(body.startsAt !== undefined && { startsAt }),
        ...(body.endsAt !== undefined && { endsAt }),
        ...(body.minOrder !== undefined && {
            minOrder: parseAmount(body.minOrder, "Minimum discount"),
        }),
    };

    if (kind === "promotion") {
        const data = {
            ...commonData,
            ...(body.name !== undefined && {
                name: 
                    typeof body.name === "string" ? body.name.trim() : "",
            }),
        };

        if (body.name !== undefined && !data.name) {
            return NextResponse.json(
                { error: "Promotion name cannot be empty"},
                { status: 400 }
            );
        }

        const promotion = await prisma.promotion.update({
            where: { id },
            data,
        });

        return NextResponse.json({ promotion });
    }

    const data = {
        ...commonData,
        ...(body.code !== undefined && {
            code: 
                typeof body.code === "string"
                    ? body.code.trim().toUpperCase()
                    : "",
        }),
        ...(body.usageLimit !== undefined && {
            usageLimit: 
                body.usageLimit === null || body.usageLimit === ""
                    ? null
                    : Number(body.usageLimit),
        }),
        ...(body.perUserLimit !== undefined && {
            perUserLimit: 
                body.perUserLimit === null || body.perUserLimit === ""
                    ? null
                    : Number(body.perUserLimit),
        }),
    };


    if (body.code !== undefined && !data.code) {
        return NextResponse.json(
            { error: "Coupon code cannot be empty"},
            { status: 400 }
        );
    }

    for (const field of ["usageLimit", "perUserLimit"] as const) {
        const value = data[field];

        if (
            value !== undefined &&
            value !== null &&
            (!Number.isInteger(value) || value <= 0)
        ) {
            return NextResponse.json(
                { error: `${field} must be a positive integer or null`},
                { status: 400 }
            );
        }
    }

    if (
        data.usageLimit !== undefined &&
        data.usageLimit !== null
    ) {
        const existing = await prisma.coupon.findUnique({
            where: { id },
            select: { usedCount: true },
        });

        if (existing && data.usageLimit < existing.usedCount) {
            return NextResponse.json(
                { error: "Usage limit cannot be lower than the current usage count"},
                { status: 400}
            );
        }
    }

    const coupon = await prisma.coupon.update({
        where: {id},
        data,
    });
    
    return NextResponse.json({ coupon });
 } catch (error) {

    if (error instanceof Error && error.message.includes("must be ")) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
    
    console.error("Discount status update failed:", error);

        return NextResponse.json(
            { error: "Discount not found or update failed:"},
            { status: 500 }
        );
    }
}