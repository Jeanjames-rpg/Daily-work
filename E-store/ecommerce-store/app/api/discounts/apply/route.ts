import { verifySession } from "@/lib/auth";
import { calculatePrice } from "@/lib/pricing";
import { error } from "console";
import { cookies } from "next/headers";
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

        let userId: number | undefined;

        if (typeof couponCode === "string" && couponCode.trim()) {
            const cookieStore = await cookies();
            const session = cookieStore.get("session");

            if(!session) {
                return NextResponse.json(
                    { error: "Please log in to use a coupon."},
                    { status: 401 }
                );
            }

            const payload = await verifySession(session.value);

            if (!payload) {
                return NextResponse.json(
                    { error: "Invalid session."},
                    { status: 401 }
                );
            }

            userId = payload.userId;
        }


        const result = await calculatePrice(
            subtotal,
            typeof couponCode === "string" ? couponCode : undefined,
            userId
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