import { DiscountType, Prisma } from "@/app/generated/prisma";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



async function isAdminOrOwner() {
    const user = await getCurrentUser();
    return user && (user.role === "ADMIN" || user.role === "OWNER");
}

function parseDiscount(body: Record<string, unknown>) {
    const { name, code, type, value, isActive, startsAt, endsAt, minOrder, maxDiscount, usageLimit, perUserLimit } = body;

    if (
        (typeof name !== "string" || !name.trim()) &&
        (typeof code !== "string" || !code.trim())
    ) {
        throw new Error("A name or coupon is required.");
    }

    if (type !== "PERCENTAGE" && type !== "FIXED") {
        throw new Error("Invalid discount type.");
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue <= 0) {
        throw new Error("Discount value must be greater than zero.");
    }

    if (type === "PERCENTAGE" && numericValue > 100) {
        throw new Error("Percentage discount cannot exceed 100.");
    }

    const parseOptionalAmount = (input: unknown, field: string) => {
        if (input === undefined || input === null || input === "") {
            return null;
        }

        const amount = Number(input);

        if (!Number.isFinite(amount) || amount < 0) {
            throw new Error(`${field} must be a non-negative number.`);
        }

        return amount;
    };

    
    const parseOptionalInteger = (input: unknown, field: string) => {
        if (input === undefined || input === null || input === "") {
            return null;
        }

        const number = Number(input);

        if (!Number.isInteger(number) || number < 0) {
            throw new Error(`${field} must be a non-negative integer.`);
        }

        return number;
    };

    const parseDate = (input: unknown, field: string) => {
        if (input === undefined || input === null || input === "") {
            return null;
        }

        if (typeof input !== "string") {
            throw new Error(`Invalid ${field}.`);
        }

        const date = new Date(input);

        if (Number.isNaN(date.getTime())) {
            throw new Error(`Invalid ${field}.`);
        }

        return date;
    };

    const start = parseDate(startsAt, "start date");
    const end = parseDate(endsAt, "end date");

    if (start && end && start > end) {
        throw new Error("End date must be after state date.");
    }

    const minOrderValue = parseOptionalAmount(minOrder, "Minimum order");
    const maxDiscountValue = parseOptionalAmount(maxDiscount, "Maximum discount");
    const usageLimitValue = parseOptionalInteger(usageLimit, "Usage limit");
    const perUserLimitValue = parseOptionalInteger(perUserLimit, "Per-user limit");

    if (usageLimitValue === 0 || perUserLimitValue === 0) {
        throw new Error("Usage limits must be grater than zero.");
    }

    return {
        name: typeof name === "string" ? name.trim() : "",
        code: typeof code === "string" ? code.trim().toUpperCase() : "",
        type,
        value: new Prisma.Decimal(numericValue),
        isActive: isActive === undefined ? true : isActive === true,
        startsAt: start,
        endsAt: end,
        minOrder: minOrderValue === null ? null : new Prisma.Decimal(minOrderValue),
        maxDiscount: maxDiscountValue === null ? null : new Prisma.Decimal(maxDiscountValue),
        usageLimit: usageLimitValue,
        perUserLimit: perUserLimitValue,
    };
}

export async function GET() {
    try {
        if (!(await isAdminOrOwner())) {
            return NextResponse.json({ error: "Unauthorized."}, {status: 403});
        }

        const [promotions, coupons] = await Promise.all([
            prisma.promotion.findMany({ orderBy: { createdAt: "desc"}}),
            prisma.coupon.findMany({ orderBy: {createdAt: "desc"}}),
        ]);

        return NextResponse.json({ promotions, coupons});
    } catch (error) {
        console.error("Fetch discounts error:", error);

        return NextResponse.json(
            { error: "Failed to fetch discounts."},
            { status: 500}
        );
    }
}

export async function POST(request: Request) {
    try {
        if (!(await isAdminOrOwner())) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 403});
        }

        const body = await request.json();

        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return NextResponse.json({ error: "Invalid request body."}, { status: 400 });
        }

        const kind = body.kind;

        if (kind !== "promotion" && kind !== "coupon") {
            return NextResponse.json(
                { error: "kind must be 'promotion' or 'coupon'."},
                { status: 400 }
            );
        }

        const parsed = parseDiscount(body);

        if (kind === "promotion") {
            if (!parsed.name) {
                return NextResponse.json(
                    { error: "Promotion name is required."},
                    { status: 400 }
                );
            }

            const promotion = await prisma.promotion.create({
                data: {
                    name: parsed.name,
                    type: parsed.type as DiscountType,
                    value: parsed.value,
                    isActive: parsed.isActive,
                    startsAt: parsed.startsAt,
                    endsAt: parsed.endsAt,
                    minOrder: parsed.minOrder,
                    maxDiscount: parsed.maxDiscount,
                },
            });

            return NextResponse.json( { promotion }, { status: 201 });
        }

        if (!parsed.code) {
            return NextResponse.json(
                { error: "Coupon code is required."},
                { status: 400 }
            );
        }

        const coupon = await prisma.coupon.create({
            data: {
                code: parsed.code,
                type: parsed.type as DiscountType,
                value: parsed.value,
                isActive: parsed.isActive,
                startsAt: parsed.startsAt,
                endsAt: parsed.endsAt,
                minOrder: parsed.minOrder,
                maxDiscount: parsed.maxDiscount,
                usageLimit: parsed.usageLimit,
                perUserLimit: parsed.perUserLimit,
            },
        });

        return NextResponse.json({ coupon }, {status: 201});
    } catch (error) {
        if ( error instanceof Error) {
            if (error.message.includes("Unique cosntraint")) {
                return NextResponse.json(
                    { error: "That coupon code already exists."},
                    { status: 409}
                );
            }

            if (
                error.message.includes("required") ||
                error.message.includes("Invalid") ||
                error.message.includes("must") ||
                error.message.includes("cannot exceed")
            ) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
        }

        console.error("Create discount error:", error);
        return NextResponse.json(
            { error: "Failed to create discount."},
            { status: 500 }
        );
    }
}