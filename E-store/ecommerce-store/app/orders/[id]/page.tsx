"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchOrder() {
            try {
                const response = await fetch(`/api/orders/${params.id}`);

                if (response.status === 401) {
                    router.push("/login");
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || "Order not found.");
                    return ;
                }

                setOrder(data.order);
            } catch {
                setError("Something went wrong .");
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    },[params.id, router]);

    if (loading) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12">
                <p className="text-gray-500">
                    Loading order..
                </p>
            </main>
        );
    }


    if (error || !order) {
        return (
            <main className="max-w-5xl mx-auto px-6 py-12">
                <div className="rounded-xl bg-red-100 p-6 text-red-700">
                    {error || "Order not found."}
                </div>

                <Link
                    href="/orders"
                    className="inline-block mt-6 rounded-lg bg-indigo-600 px-5 py-3 text-white"
                >
                    Back to Orders
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-12">

            {/* header  */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <Link
                        href="/orders"
                        className="text-indigo-600 hover:underline"
                    >
                        ← My Orders
                    </Link>


                    <h1 className="mt-3 text-4xl font-bold">
                        Order #{order.id}
                    </h1>

                    <p className="mt-2 text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN",{
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <span className="w-fit rounded-full bg-yellow-100 px-4 py-2 font-semibold text-yellow-700">
                    {order.status}
                </span>
            </div>

            {/* status  */}
            <div className="mt-10 rounded-2xl border bg-white p-6">
                <h2 className="text-xl font-bold text-slate-600">
                    Order Status
                </h2>

                <div className="mt-6 flex items-center justify-between text-slate-500">
                    <div className="text-center">
                        <div className="mx-auto h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                            ✓
                        </div>

                        <p className="mt-2 text-sm">
                            Placed
                        </p>
                    </div>
                    
                    <div className="h-1 flex-1 bg-gray-200 mx-2" />

                    <div className="text-center">
                        <div className="mx-auto h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            2
                        </div>

                        <p className="mt-2 text-sm">
                            Confirmed
                        </p>
                    </div>    

                    <div className="h-1 flex-1 bg-gray-200 mx-2" />

                    <div className="text-center">
                        <div className="mx-auto h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            3
                        </div>

                        <p className="mt-2 text-sm">
                            Shipped
                        </p>
                    </div> 

                    <div className="h-1 flex-1 bg-gray-200 mx-2" />

                    <div className="text-center">
                        <div className="mx-auto h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            4
                        </div>

                        <p className="mt-2 text-sm">
                            Delivered
                        </p>
                    </div> 

                </div>
            </div>

            {/* products  */}
            <div className="mt-8 rounded-2xl border bg-white p-6">
                <h2 className="text-xl text-slate-600 font-bold">
                    Items
                </h2>

                <div className="mt-6 space-y-5">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b pb-5 last:border-b-0 last:pb-0 text-slate-600"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {item.product.title}
                                </h3>

                                <p>
                                   ₹{Number(item.price).toFixed(2)}
                                   {" x "}
                                   {item.quantity} 
                                </p>
                            </div> 

                            <p>
                            ₹{(Number(item.price) * item.quantity).toFixed(2)}
                            </p>   
                        </div>    
                    ))}
                </div>

                {/* Total    */}
                <div className="mt-6 border-t pt-6 flex justify-between text-xl text-slate-600 font-bold">
                    <span>Total</span>

                    <span >
                        ₹{Number(order.total).toFixed(2)}
                    </span>
                </div>
            </div>

        </main>
    );
}