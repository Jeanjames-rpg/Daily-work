import { calculatePrice } from "@/lib/pricing";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { subtotal, couponCode } = body;

        if (
            typeof subtotal !== "number" ||
            !Number.isFinite(subtotal) ||
            subtotal < 0
        ) {
            return NextResponse.json(
                { error: "Invalid subtotal"},
                { status: 400 }
            );
        }

        const result = await calculatePrice(
            subtotal,
            typeof couponCode === "string" ? couponCode : undefined
        );

        return NextResponse.json(result);
    } catch (error) {
        const message = 
            error instanceof Error 
                ? error.message
                :"Failed to calculate discount.";

        return NextResponse.json(
            { error: message },{ status: 400 }        
        );
    }
}