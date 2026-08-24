"use client";

import { useCart } from "@/app/context/CartContext";

type Props = {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
};

export default function AddToCartButton({ product }: Props) {
    const { addToCart, cart } = useCart();

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    console.log("CLICKED");
                    console.log("PRODUCT:", product);

                    addToCart(product);
                }}
                className="mt-8 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 md:w-auto md:px-10"
            >
                Add to cart
            </button>

            <p className="mt-4">
                Cart items: {cart.length}
            </p>
        </div>
    );
}