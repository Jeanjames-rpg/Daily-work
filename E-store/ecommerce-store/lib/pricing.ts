import {prisma} from "@/lib/prisma"


type DiscountRule = {
    type: "PERCENTAGE" | "FIXED";
    value: number | { toString(): string};
    minOrder: number | { toString(): string} | null;
    maxDiscount: number | { toString(): string} | null;
    startsAt: Date | null;
    endsAt: Date | null;
};

function toAmount(value: number | { toString(): string }) {
    return Number(value.toString());
}

function isCurrentlyActive(rule: DiscountRule, now: Date) {
    return (
        (!rule.startsAt || rule.startsAt <= now) &&
        (!rule.endsAt || rule.endsAt >= now)
    );
}

function calculatedDiscount(
    subtotal: number,
    rule: DiscountRule
): number {
    if (rule.minOrder !== null && subtotal < toAmount(rule.minOrder)) {
        return 0;
    }

    let discount = 
        rule.type === "PERCENTAGE"
            ? (subtotal * toAmount(rule.value)) / 100
            : toAmount(rule.value);
    if (rule.maxDiscount !== null) {
        discount = Math.min(discount, toAmount(rule.maxDiscount));
    }

    return Math.min(subtotal, Math.max(0, discount));
}

export async function calculatePrice(subtotal:number, couponCode?: string) {
    if (!Number.isFinite(subtotal) || subtotal < 0 ) {
        throw new Error("Invalid subtotal.");
    }

    const now = new Date();

    const promotions = await prisma.promotion.findMany({
        where: {
            isActive: true,
            OR: [{ startsAt: null }, {startsAt: { lte: now } }],
            AND: [
                {
                    OR: [{ endsAt: null }, {endsAt: { gte: now} }],
                },
            ],
        },
    });

    // Apply the best eligible automatic promotion 
    const automaticDiscount = promotions.reduce((best, promotion) => {
        const discount = calculatedDiscount(subtotal, promotion);

        return Math.max(best, discount);
    }, 0);

    let couponDiscount = 0;
    let appliedCoupon: string | null = null;

    if (couponCode?.trim()) {
        const coupon = await prisma.coupon.findUnique({
            where: { code: couponCode.trim().toUpperCase() },
        });

        if (!coupon || coupon.isActive) {
            throw new Error("Invalid or inactive coupon.");
        }

        if (
            (coupon.startsAt && coupon.startsAt > now) ||
            (coupon.endsAt && coupon.endsAt < now )
        ) {
            throw new Error("This coupon is not currently valid.");
        }

        if (
            coupon.usageLimit !== null &&
            coupon.usedCount >= coupon.usageLimit
        ) {
            throw new Error("This has reached its usage limit.");
        }

        const couponRule: DiscountRule = coupon;

        couponDiscount = calculatedDiscount(subtotal, couponRule);

        if (couponRule.minOrder !== null &&
            subtotal < toAmount(couponRule.minOrder) 
        ) {
            throw new Error("Your order does not meet this coupon's minimum spend.");
        }

        appliedCoupon = coupon.code;
    }


    // Discounts are calculated independently on the original subtotal. 
    // The combined discount cannot exceed the subtotal. 
    const totalDiscount = Math.min(
        subtotal,
        automaticDiscount + couponDiscount
    );

    return {
        subtotal,automaticDiscount,couponDiscount,totalDiscount,
        total: Math.max(0, subtotal - totalDiscount),
        appliedCoupon,
    };

}