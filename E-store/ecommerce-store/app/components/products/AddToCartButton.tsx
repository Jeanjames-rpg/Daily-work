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

export default function AddToCartButton({product,}: Props) {
    const {addToCart} = useCart();

     function handleAddToCart() {
        console.log("ADDING PRODUCT:", product);
        addToCart(product);
    }


    return (
        <button 
        onClick={() => handleAddToCart}    
        className="mt-8 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 md:w-auto md:px-10"
        >
            Add to cart
        </button>
    );
}