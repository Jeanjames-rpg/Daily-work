"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";



type Variant = {
    id: number;
    sku: string;
    color: string | null;
    storage: string | null;
    price: number;
    stock: number;
    image: string | null;
};

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    stock: number;
};

type Props = {
    product: Product;
    varaints: Variant[];
    dark?: boolean;
};

export default function ProductDetailsClient({
    product,
    varaints,
    dark = false,
}: Props) {
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
        varaints[0]?.id ?? null
    );

    const selectedVariant = varaints.find(
        (variant) => variant.id === selectedVariantId
    );

    if (!selectedVariant) {
        return (
            <p className={dark ? "text-white" : "text-gray-800"}>
                No variant available.
            </p>
        );
    }

    return (
        <div className="space-y-6">

            {/* Product Image  */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <img
                    src={selectedVariant.image || product.image}
                    alt={product.name}
                    className="h-full max-h-150 w-full object-cover"
                />

            </div>


            {/* Variant Selection  */}
            <div className="space-y-5">

                {/* Color  */}
                {varaints.some((varaint) => varaint.color) && (
                    <div>
                        <p
                            className={`mb-2 font-medium ${
                                dark ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            Color
                        </p>

                        <div>
                            {varaints
                                .filter((varaint) => varaint.color)
                                .map((varaint) => (
                                    <button
                                        key={varaint.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedVariantId(varaint.id)
                                        }
                                        className={`rounded border px-4 py-2 ${
                                            selectedVariantId === varaint.id
                                                ? dark
                                                    ? "border-white bg-white text-black"
                                                    : "border-black bg-black text-white"
                                                : dark
                                                    ? "border-gray-600 text-white"
                                                    : "border-gray-300 text-gray-800"    
                                        }`}
                                    >
                                        {varaint.color}
                                    </button>
                                ))
                            }
                        </div>   
                    </div>    
                )}

                {/* Storage  */}
                {varaints.some((varaint) => varaint.storage) && (
                    <div>
                        <p 
                            className={`mb-2 font-medium ${
                                dark ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            Storage
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {varaints
                                .filter((varaint) => varaint.storage)
                                .map((varaint) => (
                                    <button
                                        key={varaint.id}
                                        type="button"
                                        onClick={() => setSelectedVariantId(varaint.id)}
                                        className={`rounded border px-4 py-2 ${
                                            selectedVariantId === varaint.id
                                                ? dark
                                                    ? "border-white bg-white text-black"
                                                    : "border-black bg-black text-white"
                                                : dark  
                                                    ? "border-gray-600 text-white"
                                                    : "border-gray-300 text-gray-800"
                                        }`}
                                    >
                                        {varaint.storage}
                                    </button>
                                ))
                            }
                        </div>    
                    </div>    
                )}

                {/* Price */}
                <p
                    className={`text-xl font-bold ${
                        dark ? "text-white" : "text-gray-900"
                    }`}
                >
                    ₹{selectedVariant.price.toLocaleString()}
                </p>

                {/* Stock  */}
                <p
                    className={`text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    Stock: {selectedVariant.stock}
                </p>


                {/* Add to cart  */}
                <AddToCartButton
                    product={product}
                    variants={varaints}
                    selectedVariantId={selectedVariantId}
                    // onVariantChange={setSelectedVariantId}
                    showQuantity
                    dark={dark}
                />
            </div>

        </div>
    )
}