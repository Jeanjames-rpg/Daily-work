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
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Failed to place order");
                return;
            }

            clearCart();

            alert(`Order placed successfully! Order Id: ${data.orderId}`);

            router.push("/orders");
        } catch (error) {
            console.error(error);
            alert("Something went wrong while placing the order.");
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

                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div 
                                key={item.id}
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

                    <div className="flex justify-between text-xl font-bold mt-6">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    <button 
                        onClick={handlePlaceOrder}
                        className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        Place Order
                    </button>
                </div>

            </div>
        </main>
    )
}