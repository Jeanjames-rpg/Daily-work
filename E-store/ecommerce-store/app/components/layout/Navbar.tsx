"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

export default function Navbar(){

    const { cart } = useCart();

    const [user, setUser] = useState<User | null>(null)

    const router = useRouter();

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    useEffect(() => {
        async function getUser() {
            try{
                const response = await fetch("/api/auth/me");

                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const data = await response.json();
                setUser(data.user);
            } catch {
                setUser(null);
            }
        }
        getUser();
    },[]);


    async function handleLogout() {
        await fetch("/api/auth/logout",{
            method: "POST",
        });

        setUser(null);
        window.location.href = "/";
    }

    return(

        <nav className="bg-linear-to-r from-lime-300 to-green-400 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                   
                    <Link 
                        href="/"
                        className="text-2xl font-bold text-indigo-600">
                        E-store
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {/* <a href="/" className="hover:text-emerald-600 text-white">
                            Home
                        </a> */}

                        <a href="/products" className="hover:text-emerald-600 text-white">
                            Products
                        </a>

                        {/* <a href="/cart" className="hover:text-emerald-600 text-white">
                            Cart
                        </a> */}

                        <Link href="/cart" className="hover:text-emerald-600 text-white">
                            Cart
                            {cartCount > 0 && (
                                <span className="ml-1">
                                    ({cartCount})
                                </span>
                            )}
                        </Link>

                    </div>
                    
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                             <span className="text-white font-medium">
                                Hello, {user.name}
                             </span>

                             <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                             >
                                Logout
                             </button>
                            </>
                        ):(
                            <>
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-lg border text-cyan-800 hover:bg-gray-100"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                Register
                            </Link>

                            </>
                        )}

                    </div>

                </div>
            </div>

        </nav>
    )
}