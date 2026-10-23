"use client";

import React, { useEffect, useState } from "react";


type Coupon = {
    id: number;
    code: string;
    type: "PERCENTAGE" | "FIXED"
    value: string;
    isActive: boolean;
    minOrder: string | null;
    usedCount: number;
    usageLimit: number | null;
};

export default function DiscountsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [code, setCode] = useState("");
    const [type, setType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
    const [value, setValue] = useState("");
    const [minOrder, setMinOrder] = useState("");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchDiscounts() {
            try {
                const response = await fetch("/api/admin/discounts");

                if (!response.ok) {
                    throw new Error("Failed to load discounts");
                }

                const data = await response.json();
                setCoupons(data.coupons ?? []);
            } catch {
                 setError("Could not load coupons. Please check your login.");
            } finally {
                setLoading(false);
            }
        }

        fetchDiscounts();
    }, []);

    async function handleCreateCoupon(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");
        setSaving(true);

        try {
            const response = await fetch("/api/admin/discounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    kind: "coupon",
                    code: code.trim().toUpperCase(),
                    type,
                    value: Number(value),
                    minOrder: minOrder ? Number(minOrder) : null,
                    isActive: true,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create coupon");
            }

            setCoupons((current) => [data.coupon, ...current]);
            setCode("");
            setValue("");
            setMinOrder("");
            setMessage("Coupon created successfully!");
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <p className="p-6">Loading discounts...</p>;

    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <main className="mx-auto max-w-5xl p-6">
            <h1 className="mb-6 text-2xl font-bold">Discount Management</h1>

            <form 
                onSubmit={handleCreateCoupon}
                className="mb-8 grid gap-4 rounded-xl border p-5 sm:grid-cols-2"
            >
                <h2 className="text-lg font-semibold sm:col-span-2">
                    Create Coupon
                </h2>

                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Coupon code (eg. SAVE20)"
                    required
                    className="rounded-lg border p-3"
                />

                <select
                    value={type}
                    onChange={(e) =>
                        setType(e.target.value as "PERCENTAGE" | "FIXED")
                    }
                    className="rounded-lg border p-3"
                >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed amount (₹)</option>
                </select>

                <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={type === "PERCENTAGE" ? "Discount percentage" : "Discount amount"}
                    required
                    className="rounded-lg border p-3"
                />

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    placeholder="Minimum order (₹, optional)"
                    className="rounded-lg border p-3"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-black px-5 py-3 font-medium text-white disabled:opacity-50 sm:col-span-2"
                >
                    {saving ? "Creating..." : "Create Coupon"}
                </button>

                {message && (
                    <p className="sm:col-span-2" role="status">
                        {message}
                    </p>
                )}
            </form>

            <h2 className="mb-3 text-lg font-semibold">Coupons</h2>

            {coupons.length === 0 ? (
                <p> No coupons found. </p>
            ) : (
                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-slate-700">Code</th>
                                <th className="p-3 text-slate-700">Discount</th>
                                <th className="p-3 text-slate-700">Minimum Order</th>
                                <th className="p-3 text-slate-700">Usage</th>
                                <th className="p-3 text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className="border-t">
                                    <td className="p-3 font-medium">{coupon.code}</td>
                                    <td className="p-3">
                                        {coupon.type === "PERCENTAGE"
                                            ? `${coupon.value}%`
                                            : `₹${coupon.value}`
                                        }
                                    </td>
                                    <td className="p-3">
                                        {coupon.minOrder
                                            ? `₹${coupon.minOrder}`
                                            : "No minimum"    
                                        }
                                    </td>

                                    <td className="p-3">
                                        {coupon.usedCount}
                                        {coupon.usageLimit !== null
                                            ? ` / ${coupon.usageLimit}`
                                            : " / Unlimited"
                                        }
                                    </td>

                                    <td className="p-3">
                                        {coupon.isActive ? "Active" : "Inactive"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    )
}