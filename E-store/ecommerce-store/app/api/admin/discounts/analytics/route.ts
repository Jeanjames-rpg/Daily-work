import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user || !["ADMIN", "OWNER"].includes(user.role)) {
            return NextResponse.json(
                { error: "Unauthorized"},
                { status: 403 }
            );
        }

        const [
            totalCoupons,
            activeCoupons,
            totalPromotions,
            activePromotions,
            couponUsage,
            orderDiscounts,
        ] = await Promise.all([
            prisma.coupon.count(),

            prisma.coupon.count({
                where: { isActive: true },
            }),

            prisma.promotion.count(),

            prisma.promotion.count({
                where: { isActive: true },
            }),

            prisma.coupon.aggregate({
                _sum: { usedCount: true },
            }),

            prisma.order.aggregate({
                _sum: { discount: true },
            }),
        ]);

        return NextResponse.json({
            totalCoupons,
            activeCoupons,
            totalPromotions,
            activePromotions,
            couponUsage: couponUsage._sum.usedCount ?? 0,
            recordedDiscounts:
                orderDiscounts._sum.discount?.toString() ?? "0",
        });
    } catch (error) {
        console.error("Discount analytics error:", error);

        return NextResponse.json(
            { error: "Failed to fetch discount analytics"},
            { status: 500 }
        );
    }
}