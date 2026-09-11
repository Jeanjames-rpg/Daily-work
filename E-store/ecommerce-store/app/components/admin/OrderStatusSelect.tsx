"use client";

import React from "react";

type OrderStatusSelectProps = {
    status: string;
    orderId: number;
    onStatusUpdated: () => void;
};

const statuses = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrderStatusSelect({status, orderId, onStatusUpdated,}: OrderStatusSelectProps) {
    async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newStatus = event.target.value;

        const response = await fetch(`/api/admin/orders/${orderId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            }
        );

        if (!response.ok) {
            alert("Failed to update order status.");
            return;
        }

        onStatusUpdated();
    }

    return (
        <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
                Updated Status
            </label>

            <select
                value={status}
                onChange={handleChange}
                className="rounded-lg border px-4 py-2 outline-none text-slate-500 focus:ring-2 focus:ring-indigo-500"
            >
                {statuses.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}