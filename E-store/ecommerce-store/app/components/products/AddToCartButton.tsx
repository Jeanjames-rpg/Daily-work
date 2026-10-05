"use client";

import { useCart } from "@/app/context/CartContext";
import React, { useState } from "react";


type Variant ={
    id: number;
    sku: string;
    color: string | null;
    storage: string | null;
    price: string | number;
    stock: number;
    image: string | null ;
} ;

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
    // variantId: number;
    // color: string | null;
    // storage: string | null;
};

type Props = {
    product: Product;
    variants?: Variant[];
    showQuantity?: boolean;
    dark?: boolean;
    selectedVariantId: number | null;
    // onVariantChange: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function AddToCartButton({ product,variants = [], showQuantity = false, dark = false, selectedVariantId , }: Props) {
    const { addToCart} = useCart();

    // const [selectedVariantId, setSelectedVariantId] = useState(
    //     variants[0]?.id ?? null
    // );

    const [quantity, setQuantity] = useState(1);

    const selectedVariant = variants.find(
        (variant) => variant.id === selectedVariantId
    );

    if (!selectedVariant) {
        return <p className={dark ? "text-white" : "text-gray-800"}>No variant available.</p>;
    }

    async function handleAddToCart() {
        if (!selectedVariant) {
            return;
        }

        await addToCart(
            {
                id: product.id,
                name: product.name,
                price: Number(selectedVariant.price),
                image: selectedVariant.image || product.image,
                stock: selectedVariant.stock,
                variantId: selectedVariant.id,
                sku: selectedVariant.sku,
                color: selectedVariant.color,
                storage: selectedVariant.storage,
            },
            quantity
        );

        setQuantity(1);
    }

    return (
        // <div className="flex items-center gap-3">
            
        //     {showQuantity &&(
        //     <>
        //     <button
        //         type="button"
        //         disabled={quantity <= 1}
        //         onClick={() => setQuantity((current) => current - 1 )}
        //         className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-slate-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        //     >
        //         -
        //     </button>

        //     <span className="w-8 text-center font-semibold text-slate-700">
        //         {quantity}
        //     </span>

        //     <button
        //         type="button"
        //         disabled={quantity >= product.stock}
        //         onClick={() => setQuantity((current) => current + 1)}
        //         className="h-10 w-10 rounded-lg border border-gray-300 text-lg text-slate-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        //     >
        //         +
        //     </button>
        //     </>
        //     )}

        //     <button
        //         type="button"
        //         disabled={product.stock === 0}
        //         onClick={() => {
        //             console.log("CLICKED");
        //             console.log("PRODUCT:", product);

        //             addToCart(product, quantity);
        //             setQuantity(1);
        //         }}
        //         className={`w-full rounded-lg py-3 font-semibold text-white md:w-auto md:px-10 ${
        //             product.stock === 0
        //                 ? "cursor-not-allowed bg-gray-400"
        //                 : "bg-indigo-600 hover:bg-indigo-700"
        //         }`}
        //     >
        //         {product.stock === 0 ? "Out of Stock" : "Add to cart"}
        //     </button>

            
        // </div>

        <div className="space-y-5">
            
            {/* color */}
            

            {/* Quantity  */}
            {showQuantity && (
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => 
                            setQuantity((q) => Math.max(1, q - 1))
                        }
                        className={`rounded border px-3 py-1 ${
                            dark
                                ? "border-gray-600 text-white hover:bg-gray-800"
                                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                        } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                        -
                    </button>

                    <span className={ dark ? "text-white" : "text-gray-800"}>
                        {quantity}
                    </span>

                    <button
                        type="button"
                        disabled={quantity >= selectedVariant.stock}
                        onClick={() => 
                            setQuantity((q) => q + 1)
                        }
                        className={`rounded border px-3 py-1 ${
                            dark
                                ? "border-gray-600 text-white hover:bg-gray-800"
                                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                        } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                        +
                    </button>

                </div>    
            )}

            <button
                type="button"
                disabled={selectedVariant.stock === 0}
                onClick={handleAddToCart}
                className={`rounded px-6 py-3 font-semibold transition ${
                    dark
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                } disabled:cursor-not-allowed disabled:opacity-50`}
            >
                {selectedVariant.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
            </button>

        </div>
    );
}