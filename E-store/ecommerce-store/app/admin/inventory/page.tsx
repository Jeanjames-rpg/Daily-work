"use client";

import { useEffect, useState } from "react";


type InventoryItem = {
    id: number;
    sku: string;
    color: string | null;
    storage: string | null;
    price: string;
    stock: number;
    product: {
        id: number;
        title: string;
        image: string;
    };
};

export default function InventoryPage() {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInventory() {
            try {
                const response = await fetch("/api/admin/inventory");

                if (!response.ok) {
                    throw new Error("Failed to fetch inventory");
                }

                const data = await response.json();
                setInventory(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchInventory();
    }, []);

    if (loading) {
        return (
            <div className="p-8 text-white">
                Loading inventory...
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="mb-2 text-3xl font-bold text-white">
                Inventory
            </h1>

            <p className="mb-8 text-gray-400">
                Manage stock for your product variants.
            </p>

            <div className="overflow-x-auto rounded-xl bg-white">
                <table className="w-full text-left">
                    <thead className="border-b bg-gray-100">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Variant</th>
                            <th className="px-6 py-4">SKU</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inventory.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b last:border-0"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {item.product.title}    
                                </td>            

                                <td className="px-6 py-4 text-gray-600">
                                    {item.color || "-"}
                                    {item.storage && `/ ${item.storage}`}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {item.sku}
                                </td>

                                <td className="px-6 py-4">
                                    ₹{Number(item.price).toLocaleString()}
                                </td>

                                <td className="px-6 py-4 font-semibold">
                                    {item.stock}
                                </td>

                                <td>
                                    {item.stock === 0 ? (
                                        <span className="font-semibold text-red-600">
                                            Out of Stock
                                        </span>
                                    ) : item.stock <= 5 ? (
                                        <span className="font-semibold text-orange-600">
                                            Low Stock
                                        </span>
                                    ) : (
                                        <span className="font-semibold text-green-600">
                                            In Stock
                                        </span>
                                    )
                                    
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}