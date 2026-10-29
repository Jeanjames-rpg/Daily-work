"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";


type Coupon = {
    id: number;
    code: string;
    type: "PERCENTAGE" | "FIXED"
    value: string;
    isActive: boolean;
    minOrder: string | null;
    usedCount: number;
    usageLimit: number | null;
    startsAt: string | null;
    endsAt: string | null;
    maxDiscount: string | null;
};

type Promotion = {
    id: number;
    name: string;
    type: "PERCENTAGE" | "FIXED";
    value: string;
    isActive: boolean;
    minOrder: string | null;
    startsAt: string | null;
    endsAt: string | null;
    maxDiscount: string | null;
};

type EditingDiscount = {
    id: number;
    kind: "coupon" | "promotion";
};

function formatDate(date: string | null) {
    if (!date) return "No restriction";

    return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

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

    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [promotionName, setPromotionName] = useState("");
    const [promotionType, setPromotionType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
    const [promotionValue, setPromotionValue] = useState("");
    const [promotionMinOrder, setPromotionMinOrder] = useState("");

    const [promotionStartsAt, setPromotionStartsAt] = useState("");
    const [promotionEndsAt, setPromotionEndsAt] = useState("");
    const [promotionMaxDiscount, setPromotionMaxDiscount] = useState("");

    const [startsAt, setStartsAt] = useState("");
    const [endsAt, setEndsAt] = useState("");
    const [maxDiscount, setMaxDiscount] = useState("");
    const [usageLimit, setUsageLimit] = useState("");

    const [editingDiscount, setEditingDiscount] = useState<EditingDiscount | null>(null);

    const [editName, setEditName] = useState("");
    const [editCode, setEditCode] = useState("");
    const [editType, setEditType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
    const [editValue, setEditValue] = useState("");
    const [editMinOrder, setEditMinOrder] = useState("");
    const [editMaxDiscount, setEditMaxDiscount] = useState("");
    const [editStartsAt, setEditStartsAt] = useState("");
    const [editEndsAt, setEditEndsAt] = useState("");
    const [editUsageLimit, setEditUsageLimit] = useState("");

    useEffect(() => {
        async function fetchDiscounts() {
            try {
                const response = await fetch("/api/admin/discounts");

                if (!response.ok) {
                    throw new Error("Failed to load discounts");
                }

                const data = await response.json();
                setCoupons(data.coupons ?? []);
                setPromotions(data.promotions ?? []);
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
                    startsAt: startsAt ? new Date(startsAt).toISOString() : null,
                    endsAt: endsAt ? new Date(endsAt).toISOString() : null,
                    maxDiscount: maxDiscount ? Number(maxDiscount) : null,
                    usageLimit: usageLimit ? Number(usageLimit) : null,
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

            setStartsAt("");
            setEndsAt("");
            setMaxDiscount("");
            setUsageLimit("");

            setMessage("Coupon created successfully!");
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setSaving(false);
        }
    }

    async function handleCreatePromotion(e: SyntheticEvent<HTMLElement>) {
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
                    kind: "promotion",
                    name: promotionName.trim(),
                    type: promotionType,
                    value: Number(promotionValue),
                    minOrder: promotionMinOrder
                        ? Number(promotionMinOrder)
                        : null,
                        isActive: true,
                    startsAt: promotionStartsAt
                        ? new Date(promotionStartsAt).toISOString()
                        : null,
                    endsAt: promotionEndsAt
                        ? new Date(promotionEndsAt).toISOString()
                        : null,
                    maxDiscount: promotionMaxDiscount
                        ? Number(promotionMaxDiscount)
                        : null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create promotion");
            }

            setPromotions((current) => [data.promotion, ...current]);
            setPromotionName("");
            setPromotionValue("");
            setPromotionMinOrder("");

            setPromotionStartsAt("");
            setPromotionEndsAt("");
            setPromotionMaxDiscount("");

            setMessage("Promotion created successfully!");
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setSaving(false);
        }
    }

    async function toggleDiscount(
        kind: "coupon" | "promotion",
        id: number,
        isActive: boolean
    ) {
        const response = await fetch(`/api/admin/discounts/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ kind, isActive }),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.error || "Failed to update discount");
            return;
        }

        if (kind === "coupon") {
            setCoupons((current) => 
                current.map((coupon) => 
                    coupon.id === id ? {...coupon, isActive } : coupon
                )
            );
        } else {
            setPromotions((current) =>
                current.map((promotion) => 
                    promotion.id === id 
                        ? {...promotion, isActive}
                        : promotion
                )
            );
        }

        setMessage(`Discount ${isActive ? "activated" : "deactivated"}.`);
    }

    function openEditCoupon(coupon: Coupon) {
        setEditingDiscount({ id: coupon.id, kind: "coupon" });
        setEditCode(coupon.code);
        setEditType(coupon.type);
        setEditValue(coupon.value);
        setEditMinOrder(coupon.minOrder ?? "");
        setEditMaxDiscount(coupon.maxDiscount ?? "");
        setEditStartsAt(coupon.startsAt ? coupon.startsAt.slice(0, 16) : "");
        setEditEndsAt(coupon.endsAt ? coupon.endsAt.slice(0, 16) : "");
        setEditUsageLimit(coupon.usageLimit === null ? "" : String(coupon.usageLimit));
    }

    function openEditPromotion(promotion: Promotion) {
        setEditingDiscount({ id: promotion.id, kind: "promotion"});
        setEditName(promotion.name);
        setEditType(promotion.type);
        setEditValue(promotion.value);
        setEditMinOrder(promotion.minOrder ?? "");
        setEditMaxDiscount(promotion.maxDiscount ?? "");
        setEditStartsAt(promotion.startsAt ? promotion.startsAt.slice(0, 16) : "");
        setEditEndsAt(promotion.endsAt ? promotion.endsAt.slice(0, 16) : "");
    }

    if (loading) return <p className="p-6">Loading discounts...</p>;

    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <main className="mx-auto max-w-5xl p-6">
            <h1 className="mb-6 text-2xl font-bold">Discount Management</h1>

            <section className="mb-10">
                <h2 className="mb-4 text-lg font-semibold">
                    Create Automatic Promotion
                </h2>

                <form
                    onSubmit={handleCreatePromotion}
                    className="mb-6 grid gap-4 rounded-xl border p-5 sm:grid-cols-2"
                >

                    <input
                        value={promotionName}
                        onChange={(e) => setPromotionName(e.target.value)}
                        placeholder="Promotion name"
                        required
                        className="rounded-lg border p-3"
                    />

                    <select
                        value={promotionType}
                        onChange={(e) =>
                            setPromotionType(e.target.value as "PERCENTAGE" | "FIXED")
                        }
                        className="rounded-lg border p-3"
                    >
                        <option value="PERCENTAGE">Percentage (%)</option>            
                        <option>Fixed amount (₹)</option>

                    </select>

                    <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        max={promotionType === "PERCENTAGE" ? 100 : undefined}
                        value={promotionValue}
                        onChange={(e) => setPromotionValue(e.target.value)}
                        placeholder="Discount value"
                        required
                        className="rounded-lg border p-3"
                    />

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={promotionMinOrder}
                        onChange={(e) => setPromotionMinOrder(e.target.value)}
                        placeholder="Minimum order (₹, optional)"
                        className="rounded-lg border p-3"
                    />

                    <input
                        type="datetime-local"
                        value={promotionStartsAt}
                        onChange={(e) => setPromotionStartsAt(e.target.value)}
                        aria-label="Promotion start date"
                        className="rounded-lg border p-3"
                    />    

                    <input
                        type="datetime-local"
                        value={promotionEndsAt}
                        min={promotionStartsAt || undefined}
                        onChange={(e) => setPromotionEndsAt(e.target.value)}
                        aria-label="Promotion end date"
                        className="rounded-lg border p-3"
                    />

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={promotionMaxDiscount}
                        onChange={(e) => setPromotionMaxDiscount(e.target.value)}
                        placeholder="Maximum discount (₹, optional)"
                        className="rounded-lg border p-3"
                    />

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50 sm:col-span-2"
                    >
                        {saving ? "Creating..." : "Create Promotion"}
                    </button>
                </form>

                <h3 className="mb-3 font-semibold">Existing Promotions</h3>

                {promotions.length === 0 ? (
                    <p className="text-gray-500">No promotions created yet.</p>

                ) : (
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-slate-600">Name</th>
                                    <th className="p-3 text-slate-600">Discounts</th>
                                    <th className="p-3 text-slate-600">Minimum Orders</th>
                                    <th className="p-3 text-slate-600">Starts At</th>
                                    <th className="p-3 text-slate-600">Ends At</th>
                                    <th className="p-3 text-slate-600">Max Discount</th>
                                    <th className="p-3 text-slate-600">Status</th>
                                    <th className="p-3 text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promotions.map((promotion) => (
                                    <tr key={promotion.id} className="border-t">
                                        <td className="p-3">{promotion.name}</td>            
                                        <td className="p-3">
                                            {promotion.type === "PERCENTAGE"
                                                ? `${promotion.value}%`
                                                : `₹${promotion.value}`
                                            }
                                        </td>
                                        <td className="p-3">
                                            {promotion.minOrder
                                                ? `₹${promotion.minOrder}`
                                                : "No minimum"
                                            }
                                        </td>

                                        <td className="p-3 whitespace-nowrap">
                                            {formatDate(promotion.startsAt)}
                                        </td>    

                                        <td className="p-3 whitespace-nowrap">
                                            {formatDate(promotion.endsAt)}
                                        </td>

                                        <td className="p-3 whitespace-nowrap">
                                            {promotion.maxDiscount
                                                ? `₹${promotion.maxDiscount}`
                                                : "No cap"
                                            }
                                        </td>

                                        <td className="p-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleDiscount(
                                                        "promotion",
                                                        promotion.id,
                                                        !promotion.isActive
                                                    )
                                                }
                                                className="rounded border px-3 py-1"
                                            >
                                                {promotion.isActive ? "Active" : "Inactive"}
                                            </button>
                                        </td>

                                        <td className="p-3">
                                            <button
                                                type="button"
                                                onClick={() => openEditPromotion(promotion)}
                                                className="rounded border px-3 py-1"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>


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

                <input
                    type="datetime-local"
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                    className="rounded-lg border p-3"
                    aria-label="Coupon start date"
                />

                <input
                    type="datetime-local"
                    value={endsAt}
                    min={startsAt || undefined}
                    onChange={(e) => setEndsAt(e.target.value)}
                    className="rounded-lg border p-3"
                    aria-label="Coupon end date"
                />

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder="Maximum discount (₹, optional)"
                    className="rounded-lg border p-3"
                />

                <input
                    type="number"
                    min="1"
                    step="1"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    placeholder="Total usage limit (optional)"
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

            {editingDiscount && (
                <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                         Edit {editingDiscount.kind === "coupon" ? "Coupon" : "Promotion"}   
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        {editingDiscount.kind === "coupon" ? (
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Coupon Code
                                </label>

                                <input
                                    value={editCode}
                                    onChange={(e) => setEditCode(e.target.value)}
                                    className="w-full rounded-lg border p-2"
                                />
                                
                            </div>    
                        ) : (
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Promotion Name
                                </label>

                                <input
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="w-full rounded-lg border p-2"
                                />
                            </div>    
                        )}

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Discount Type
                            </label>

                            <select
                                value={editType}
                                onChange={(e) => setEditType(e.target.value as "PERCENTAGE" | "FIXED")}
                                className="w-full rounded-lg border p-2"
                            >
                                <option value="PERCENTAGE">Percentage</option>
                                <option value="FIXED">Fixed Amount</option>

                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Discount Value
                            </label>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Minimum Order Amount
                            </label>

                            <input
                                type="number"
                                value={editMinOrder}
                                onChange={(e) => setEditMinOrder(e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                        </div>


                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Maximum Discount
                            </label>

                            <input
                                type="number"
                                value={editMaxDiscount}
                                onChange={(e) => setEditMaxDiscount(e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Starts At
                            </label>

                            <input
                                type="datetime-local"
                                value={editStartsAt}
                                onChange={(e) => setEditStartsAt(e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Ends At
                            </label>

                            <input
                                type="datetime-local"
                                value={editEndsAt}
                                onChange={(e) => setEditEndsAt(e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                        </div>

                        {editingDiscount.kind === "coupon" && (
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Usage Limit
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={editUsageLimit}
                                    onChange={(e) => setEditUsageLimit(e.target.value)}
                                    className="w-full rounded-lg border p-2"
                                />
                            </div>    
                        )}

                    </div>

                    <div className="mt-5 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setEditingDiscount(null)}
                            className="rounded-lg border px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                            Save Changes
                        </button>
                    </div>    

                </div>
            )}

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
                                <th className="p-3 text-slate-700" >Starts At</th>
                                <th className="p-3 text-slate-700" >Ends At</th>
                                <th className="p-3 text-slate-700">Max Discount</th>
                                <th className="p-3 text-slate-700">Status</th>
                                <th className="p-3 text-slate-700">Action</th>
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

                                    <td className="p-3 whitespace-nowrap">
                                        {formatDate(coupon.startsAt)}    
                                    </td>    

                                    <td className="p-3 whitespace-nowrap">
                                        {formatDate(coupon.endsAt)}    
                                    </td>    

                                    <td className="p-3 whitespace-nowrap">
                                        {coupon.maxDiscount
                                            ? `₹${coupon.maxDiscount}`
                                            : "No cap"
                                        }
                                    </td>

                                    <td className="p-3">
                                        <button
                                            type="button"
                                            onClick={() => 
                                                toggleDiscount("coupon", coupon.id, !coupon.isActive)
                                            }
                                            className="rounded border px-3 py-1"
                                        >
                                            {coupon.isActive ? "Active" : "Inactive"}
                                        </button>
                                    </td>

                                    <td className="p-3">
                                        <button
                                            type="button"
                                            onClick={() => openEditCoupon(coupon)}
                                            className="rounded border px-3 py-1"
                                        >
                                            Edit
                                        </button>
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