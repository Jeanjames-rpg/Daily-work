"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

type Props = {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        stock: number;
    };
    showQuantity?: boolean;
};

export default function AddToCartButton({ product, showQuantity = false, }: Props) {
    const { addToCart} = useCart();
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex items-center gap-3">
            
            {showQuantity &&(
            <>
            <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity((current) => current - 1 )}
                className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-slate-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                -
            </button>

            <span className="w-8 text-center font-semibold text-slate-700">
                {quantity}
            </span>

            <button
                type="button"
                disabled={quantity >= product.stock}
                onClick={() => setQuantity((current) => current + 1)}
                className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-slate-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                +
            </button>
            </>
            )}

            <button
                type="button"
                disabled={product.stock === 0}
                onClick={() => {
                    console.log("CLICKED");
                    console.log("PRODUCT:", product);

                    addToCart(product, quantity);
                    setQuantity(1);
                }}
                className={`w-full rounded-lg py-3 font-semibold text-white md:w-auto md:px-10 ${
                    product.stock === 0
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
                {product.stock === 0 ? "Out of Stock" : "Add to cart"}
            </button>

            
        </div>
    );
}