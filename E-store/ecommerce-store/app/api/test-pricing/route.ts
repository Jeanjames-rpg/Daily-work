import { calculatePrice } from "@/lib/pricing";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json(
            { error: "Not available."},
            { status: 404 }
        );
    }

    const params = request.nextUrl.searchParams;
    const subtotal = Number(params.get("subtotal"));
    const couponCode = params.get("couponCode") || undefined;

    if (
        params.get('subtotal') === null ||
        !Number.isFinite(subtotal) ||
        subtotal < 0
    ) {
        return NextResponse.json(
            { error: "Provide a valid subtotal."},
            { status: 400 }
        );
    }

    try {
        const pricing = await calculatePrice(subtotal, couponCode);

        return NextResponse.json(pricing);
    } catch (error) {
        return NextResponse.json(
            { 
                error:
                    error instanceof Error
                        ? error.message
                        : "Pricing calculation failed.",
            },
            { status: 400 }
        );
    }
}