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

    async function updateStock(variantId: number, stock: number) {
        try {
            const response = await fetch(
                `/api/admin/inventory/${variantId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        stock,
                    }),
                }
            );

            if (!response.ok) {
                const data = await response.json();
                alert(data.error || "Failed to update stock");
                return;
            }

            setInventory((current) => 
                current.map((item) =>
                    item.id === variantId
                        ? { ...item, stock}
                        : item
                )
            );
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    }

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
                            <th className="px-6 py-4 text-slate-700">Product</th>
                            <th className="px-6 py-4 text-slate-700">Variant</th>
                            <th className="px-6 py-4 text-slate-700">SKU</th>
                            <th className="px-6 py-4 text-slate-700">Price</th>
                            <th className="px-6 py-4 text-slate-700">Stock</th>
                            <th className="px-6 py-4 text-slate-700">Status</th>
                            <th className="px-6 py-4 text-slate-400">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inventory.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b last:border-0"
                            >
                                <td className="px-6 py-4 font-medium text-slate-600">
                                    {item.product.title}    
                                </td>            

                                <td className="px-6 py-4 text-gray-600">
                                    {item.color || "-"}
                                    {item.storage && `/ ${item.storage}`}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {item.sku}
                                </td>

                                <td className="px-6 py-4 text-slate-600">
                                    ₹{Number(item.price).toLocaleString()}
                                </td>

                                <td className="px-6 py-4 font-semibold text-slate-600">
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

                                <td className="px-6 py-4">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const newStock = prompt("Enter new stock:", String(item.stock));

                                            if (newStock === null) return;

                                            const stock = Number(newStock);

                                            if (!Number.isInteger(stock) || stock < 0){
                                                alert("Please enter a valid stock number.");
                                                return;
                                            }

                                            updateStock(item.id, stock);
                                        }}
                                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                    >
                                        Edit Stock
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}