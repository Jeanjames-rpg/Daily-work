"use client";

import OrderCard, { AdminOrder } from "@/app/components/admin/OrderCard";
import { useEffect, useState } from "react";


type Product = {
    id: number;
    title: string;
};

type OrderItem = {
    id: number;
    quantity: number;
    price: string;
    product: Product;
};

type User = {
    id: number;
    name: string;
    email: string;
};

type Order = {
    id: number;
    total: string;
    status: string;
    createdAt: string;
    user: User;
    items: OrderItem[];
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchOrder() {
        try {
            const response = await fetch("/api/admin/orders");
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to load orders.");
                return;
            }

            setOrders(data.orders);
        } catch {
            setError("something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-12">
                <p>Loading orders..</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="rounded-lg bg-red-100 p-4 text-red-700">
                    {error}
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Order Management
                </h1>

                <p className="mt-2 text-gray-500">
                    View and manage customer orders.
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="rounded-xl border p-8 text-center text-gray-500">
                    No orders found.
                </div>
            ):(
                <div className="space-y-6">
                    {orders.map((order) => (
                                 
                        <OrderCard key={order.id} order={order} onStatusUpdated={fetchOrder} />  
                    ))}
                </div>
            )}
        </main>
    )
}