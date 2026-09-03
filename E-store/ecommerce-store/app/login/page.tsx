"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function LoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            // localStorage.setItem(
            //     "user",
            //     JSON.stringify(data.user)
            // );

            router.push("/");
            router.refresh();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-400">
                    Welcome Back
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    Login to your E-store account
                </p>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-100 p-3 text-red-700">
                        {error}
                    </div>
                )}

                <form 
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label className="block mb-2 font-medium text-gray-400">
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border px-4 py-3 text-gray-600"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-400">
                            Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border px-4 py-3 text-gray-600"
                            placeholder="Your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in...": "Login"}
                    </button>
                    
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Dont have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </section>
    );
}