"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";


export default function Navbar(){

    const { cart } = useCart();

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return(

        <nav className="bg-linear-to-r from-lime-300 to-green-400 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                   
                    <h1 className="text-2xl font-bold text-indigo-600">
                        E-store
                    </h1>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/" className="hover:text-emerald-600 text-white">
                            Home
                        </a>

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
                        <button className="px-4 py-2 rounded-lg border text-cyan-800 hover:bg-gray-100">
                            Login
                        </button>

                        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                            Register
                        </button>

                    </div>

                </div>
            </div>

        </nav>
    )
}