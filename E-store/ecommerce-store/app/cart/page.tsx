"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";



export default function CartPage() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        total,
    } = useCart();

    if (cart.length === 0) {
        return (
            <section className="text-center py-20">
                <h1 className="text-4xl font-bold">
                    Your cart is Empty
                </h1>

                <p className="mt-4 text-gray-500">
                    Add some products to your cart.
                </p>
            </section>
        );
    }

    return (
        <section>
            <h1 className="text-4xl font-bold mb-10">
                Shopping Cart
            </h1>

            <div className="space-y-6">
                {cart.map((item)=> (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center gap-5"
                    >
                        {/* <img
                            src={item.image}
                            alt={item.name}
                            className="h-24 w-24 rounded-lg object-cover"
                        /> */}
                        {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-24 w-24 rounded-lg object-cover"
                        />
                        ) : (
                        <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                            No image
                        </div>
                        )}

                        <div className="flex-1">
                            <h2 className="text-xl text-slate-700 font-semibold">
                                {item.name}
                            </h2>

                            <p className="text-indigo-600 font-bold mt-2">
                                ₹{item.price}
                            </p>

                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={()=> decreaseQuantity(item.id)}
                                className="h-9 w-9 rounded border text-slate-600"
                            >
                                -
                            </button>

                            <span className="font-semibold text-slate-700">
                                {item.quantity}
                            </span>

                            <button
                                onClick={()=> increaseQuantity(item.id)}
                                className="h-9 w-9 rounded border text-slate-600"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                        >
                            Remove
                        </button>        

                    </div>   
                ))}
            </div>

            <div className="mt-10 flex justify-end">
                <div className="bg-white rounded-xl shadow p-6 w-full md:w-96">
                    <h2 className="text-2xl font-bold text-slate-700">
                        Cart Total
                    </h2>

                    <p className="text-3xl font-bold text-indigo-600 mt-4">
                        ₹{total}
                    </p>

                    <button 
                        className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700"
                    >

                    </button>
                    <Link 
                        href="/checkout"
                        className="block w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white hover:bg-indigo-700"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </section>
    )
}