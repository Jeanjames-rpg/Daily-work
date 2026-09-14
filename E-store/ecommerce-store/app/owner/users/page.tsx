"use client";

import { useEffect, useState } from "react";


type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
};

export default function OwnerUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchUsers() {
        try {
            const response = await fetch("/api/owner/users");
            const data = await response.json();

            if (!response.ok){
                setError(data.error  || "Failed to load users.");
                return;
            }

            setUsers(data.users);
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    },[]);

    if (loading) {
        return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <p>Loading users...</p>
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
                    User Management
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage customers and administrators.
                </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
                <table className="w-full text-left">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-gray-600">Name</th>
                            <th className="px-6 py-4 text-gray-600">Email</th>
                            <th className="px-6 py-4 text-gray-600">Role</th>
                            <th className="px-6 py-4 text-gray-600">Joined</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b last:border-b-0"
                            >
                                <td className="px-6 py-4 font-medium text-gray-600">
                                    {user.name}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-slate-600">
                                        {user.role}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </main>
    );
}