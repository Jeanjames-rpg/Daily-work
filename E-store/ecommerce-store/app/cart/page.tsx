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
        <section className="py-20 text-center">

            <h1 className="text-4xl font-bold text-slate-800">
                Your Cart is Empty
            </h1>

            <p className="mt-4 text-gray-500">
                Looks like you haven't added anything to your cart yet.
            </p>

            <Link
                href="/products"
                className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
                Browse Products
            </Link>

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
                        key={item.variantId}
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

                            <p className="mt-2 text-sm text-gray-500">
                                ₹{item.price} × {item.quantity}
                            </p>

                            <p className="mt-1 text-lg font-bold text-indigo-600">
                                ₹{item.price * item.quantity}
                            </p>

                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={()=> decreaseQuantity(item.variantId)}
                                className="h-9 w-9 rounded border text-slate-600"
                            >
                                -
                            </button>

                            <span className="font-semibold text-slate-700">
                                {item.quantity}
                            </span>

                            <button
                                onClick={()=> increaseQuantity(item.variantId)}
                                disabled={item.quantity >= item.stock}
                                className="h-9 w-9 rounded border text-slate-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.variantId)}
                            className="text-red-600 hover:text-red-700"
                        >
                            Remove
                        </button>        

                    </div>   
                ))}
            </div>

            <div className="mt-10 flex justify-end">
                <div className="w-full rounded-2xl bg-white p-6 shadow-md md:w-96">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Order Summary
                    </h2>

                <div className="mt-6 flex items-center justify-between border-b pb-4">
                    <span className="text-gray-500">
                        Items
                    </span>

                    <span className="font-medium text-slate-700">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                </div>

            <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-700">
                    Total
                </span>

                <span className="text-2xl font-bold text-indigo-600">
                    ₹{total}
                </span>
            </div>

            <Link
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
            >
                Proceed to Checkout
            </Link>

        </div>
    </div>
        </section>
    )
}