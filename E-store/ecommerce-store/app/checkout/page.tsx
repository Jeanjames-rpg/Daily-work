"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import {  useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, total, clearCart } = useCart();

    const [user, setUser] = useState< User | null >(null);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [error, setError] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [discountResult, setDiscountResult] = useState<{
        subtotal: number;
        automaticDiscount: number;
        couponDiscount: number;
        totalDiscount: number;
        total: number;
        appliedCoupon: string | null;
    } | null >(null);

    const [applyingCoupon, setApplyingCoupon] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("/api/auth/me");

                if (!response.ok) {
                    router.push("/login");
                    return;
                }

                const data = await response.json();
                setUser(data.user);
            } catch {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [router]);

    async function handleApplyCoupon() {
        setApplyingCoupon(true) ;
        setCouponMessage("");
        setDiscountResult(null);

        try {
            const response = await fetch("/api/discounts/apply", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subtotal: total,
                    couponCode: couponCode.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setCouponMessage(data.error || "Unable to apply coupon.");
                return;
            }

            setDiscountResult(data);
            setCouponMessage(
                data.appliedCoupon 
                    ? `Coupon ${data.appliedCoupon} applied successfully!`
                    : "Automatic promotion calculated."
            );
        } catch {
            setCouponMessage("Something went wrong. Please try again.");
        } finally {
            setApplyingCoupon(false);
        }
    }

    if (loading) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12">
                <p>Checking login...</p>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    if (cart.length === 0) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-4">
                    Your cart is empty.
                </h1>

                <button
                    onClick={() => router.push("/products")}
                    className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                >
                    Browse Products
                </button>
            </main>
        );
    }

    async function handlePlaceOrder() {
        setError("");
        setPlacingOrder(true);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        // productId: item.id,
                        variantId: item.variantId,
                        quantity: item.quantity,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Failed to place order");
                return;
            }

             await clearCart();

            alert(`Order placed successfully! Order Id: ${data.orderId}`);

            router.push("/orders");
        } catch (error) {
            console.error(error);
            setError("Something went wrong while placing the order.");
        } finally {
            setPlacingOrder(false);
        }
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            <div className="grid gap-8 md:grid-cols-2">

                {/* customer info */}
                <div className="rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Customer Information
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-500">
                                Name
                            </p>

                            <p className="font-medium">
                                {user.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-medium">
                                {user.email}
                            </p>
                        </div>
                    </div>

                </div>

                {/* Order summary */}
                <div className="rounded-xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>

                    {/* Coupon section  */}
                    <div className="mb-6">
                        <label
                            htmlFor="couponCode"
                            className="mb-2 block text-sm font-medium"
                        >
                            Have a coupon
                        </label>

                        <div className="flex gap-2">
                            <input
                                id="couponCode"
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="min-w-0 flex-1 rounded-lg border px-3 py-2"
                            />

                            <button
                                type="button"
                                // onClick={() => {
                                //     setCouponMessage(
                                //         "Coupon validation will be connected in the next step."
                                //     );
                                // }}
                                onClick={handleApplyCoupon}
                                disabled={applyingCoupon}
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                            >
                                {applyingCoupon ? "Applying..." : "Apply"}
                            </button>
                        </div>

                        {couponMessage && (
                            <p className="mt-2 text-sm">
                                {couponMessage}
                            </p>
                        )}
                    </div>

                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div 
                                key={item.variantId}
                                className="flex justify-between border-b pb-3"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        ₹{item.price} x {item.quantity}
                                    </p>
                                </div> 

                                <p className="font-medium">
                                    ₹{item.price * item.quantity}
                                </p>  
                            </div>    
                        ))}
                    </div>

                    {/* <div className="flex justify-between text-xl font-bold mt-6">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div> */}

                    {discountResult && (
                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Automatic discount</span>

                                <span>
                                    -₹{discountResult.automaticDiscount.toFixed(2)}
                                </span>
                            </div>    

                            <div>
                                <span>Coupon discount</span>

                                <span>
                                    -₹{discountResult.couponDiscount.toFixed(2)}
                                </span>
                            </div>    

                            <div className="flex justify-between font-medium">
                                <span>Total savings</span>

                                <span>
                                    ₹{discountResult.totalDiscount.toFixed(2)}
                                </span>
                            </div>    
                        </div>    
                    )}

                    <div className="mt-6 flex justify-between text-xl font-bold">
                        <span>Total</span>

                        <span>
                            ₹{(discountResult?.total ?? total).toFixed(2)}
                        </span>
                    </div>
                    
                    {error && (
                        <div className="mt-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
                            {error}
                        </div>    
                    )}

                    <button 
                        onClick={handlePlaceOrder}
                        disabled={placingOrder}
                        className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {placingOrder ? "Placing Order..." : "Place Order"}
                    </button>
                </div>

            </div>
        </main>
    )
}