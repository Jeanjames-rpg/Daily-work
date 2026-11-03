import { title } from "process";


type DiscountAnalyticsProps = {
    analytics: {
        totalCoupons: number;
        activeCoupons: number;
        totalPromotions: number;
        activePromotions: number;
        couponUsage: number;
        recordedDiscounts: string;
    } | null;
};

export default function DiscountAnalytics({
    analytics,
}: DiscountAnalyticsProps) {
    if (!analytics) {
        return <p className="text-gray-500">Loading analytics....</p>
    }

    const cards = [
        {
            title: "Total Coupons",
            value: analytics.totalCoupons,
        },
        {
            title: "Active Coupons",
            value: analytics.activeCoupons,
        },
        {
            title: "Total Promotions",
            value: analytics.totalPromotions,
        },
        {
            title: "Active Promotions",
            value: analytics.activePromotions,
        },
        {
            title: "Coupon Usage",
            value: analytics.couponUsage,
        },
        {
            title: "Recorded Discounts",
            value: `₹${Number(analytics.recordedDiscounts).toLocaleString("en-IN")}`,
        },
    ];

    return (
        <section className="mb-10">

            <h2 className="mb-5 text-2xl font-bold">
                Discount Analytics
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm text-gray-600">
                            {card.title}
                        </p>

                        <h3 className="mt-2 text-3xl text-slate-700 font-bold">
                            {card.value}
                        </h3>
                    </div>    
                ))}
            </div>

        </section>
    );
}