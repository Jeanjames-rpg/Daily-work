"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type Product = {
    id: number;
    title: string;
    image: string;
};

type OrderItem = {
    id: number;
    quantity: number;
    price: string;
    product: Product;
};

type Order = {
    id: number;
    total: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
};

export default function OrdersPage() {
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("/api/orders");

                if (response.status === 401) {
                    router.push("/login");
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || "Failed to load orders.");
                    return;
                }

                setOrders(data.orders);
            } catch {
                setError("Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    },  [router]);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-6 py-12">
                <p className="text-gray-500">Loading your orders...</p>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    My Orders
                </h1>


                <p className="mt-2 text-gray-500">
                    View your previous purchases
                </p>
            </div>

            {error && (
                <div className="rounded-lg bg-red-100 p-4 text-red-700">
                    {error}
                </div>
            )}

            {orders.length === 0 && !error && (
                <div className="rounded-2xl border bg-white p-10 text-center">
                    <h2 className="text-2xl font-semibold">
                        No orders yet
                    </h2>

                    <p className="mt-2 text-gray-500">
                        You haven't placed any orders
                    </p>

                    <Link 
                        href="/products"
                        className="inline-block mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                    >
                            Start Shopping
                    </Link>
                </div>
            )}

            <div className="space-y-6">
                {orders.map((order) => (
                    <Link
                        key={order.id}
                        href={`/orders/${order.id}`}
                        className="block rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
                    >
                        {/* Order header  */}
                        <div className="flex flex-col gap-2 border-b pb-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-600">
                                    Order #{order.id}
                                </h2>

                                <p className="text-slate-700">
                                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>

                                <div className="mt-3">
                                    <span 
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                                            order.status === "PENDING"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order.status === "CONFIRMED"
                                                ? "bg-blue-100 text-blue-700"
                                                : order.status === "SHIPPED"
                                                ? "bg-purple-100 text-purple-700"
                                                : order.status === "DELIVERED"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "CANCELLED"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>    
                            </div>
                            
                            <p className="text-xl font-bold text-indigo-600">
                                ₹{Number(order.total).toFixed(2)}  
                            </p>    
                        </div>

                        {/* Order Items  */}
                        <div className="mt-5 space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div  className="flex items-center gap-4">

                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="h-16 w-16 rounded-lg object-cover" 
                                            />
                                        ) : (
                                            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-slate-700">
                                                {item.product.title}
                                            </h3>

                                            <p className="text-slate-800">
                                                ₹{Number(item.price).toFixed(2)}
                                                {" x "}
                                                {item.quantity}
                                            </p>

                                        </div>    
                                    </div>
                                        <p className="font-semibold text-slate-500">
                                            ₹ {(Number(item.price) * item.quantity).toFixed(2)}
                                        </p>

                                </div>    
                            ))}
                        </div>    

                        {/* Footer  */}
                        <div className="mt-6 border-t pt-5">
                            <p className="text-sm text-gray-500">
                                {order.items.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                )}{" "}
                                {order.items.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                ) === 1
                                    ? "item"
                                    : "items"}
                            </p>
                        </div>    

                    </Link>    
                ))}
            </div>

        </main>
    );
}