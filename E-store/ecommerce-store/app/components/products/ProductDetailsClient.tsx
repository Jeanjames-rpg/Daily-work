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
    variants: Variant[];
    dark?: boolean;
};

export default function ProductDetailsClient({
    product,
    variants,
    dark = false,
}: Props) {

    const [selectedColor, setSelectedColor] = useState<string | null>(
        variants[0]?.color ?? null
    );

    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
        variants[0]?.id ?? null
    );

    // Show only storage options for the selcted color 
    const filteredVariants = variants.filter(
        (variant) => variant.color === selectedColor
    );

    // Find unique colors.
    const colors = [
        ...new Set(
            variants
                .map((variant) => variant.color)
                .filter((color): color is string => Boolean(color))
        ),
    ];

    const selectedVariant = variants.find(
        (variant) => variant.id === selectedVariantId
    );

    const handleColorChange = (color: string) => {
        setSelectedColor(color)

        // Select the first variant available in this color.
        const firstVariant = variants.find(
            (variant) => variant.color === color
        );

        setSelectedVariantId(firstVariant?.id ?? null);
    };

    const handleStorageChange = (variantId: number) => {
        setSelectedVariantId(variantId)
    }

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

            <div className="space-y-5">
                {/* Color Selection  */}
                
                {colors.length > 0 && (
                    <div>
                        <p
                            className={`mb-2 font-medium ${
                                dark ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            Color: {selectedColor}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleColorChange(color)}
                                    className={`rounded-lg border px-4 py-2 ${
                                        selectedColor === color
                                             ? dark
                                                ? "border-white bg-white text-black"
                                                : "border-black bg-black text-white"
                                            : dark
                                                ? "border-gray-600 text-white"
                                                : "border-gray-300 text-gray-800"
                                    }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>    
                    </div>    
                )}

                {/* Storage selection  */}

                {filteredVariants.some((variant) => variant.storage) && (
                    <div>
                        <p
                            className={`mb-2 font-medium ${
                                dark ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            Storage
                        </p>

                        <div>
                            {filteredVariants
                            .filter(
                                (variant) => variant.storage !== null
                            )
                            .map((variant) => (
                                <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() => 
                                        handleStorageChange(variant.id)
                                    }
                                    className={`rounded-lg border px-4 py-2 ${
                                        selectedVariantId === variant.id
                                            ? dark
                                                ? "border-white bg-white text-black"
                                                : "border-black bg-black text-white"
                                            : dark
                                                ? "border-gray-600 text-white"
                                                : "border-gray-300 text-gray-800"    
                                    }`}
                                >
                                    {variant.storage}
                                </button>
                            ))
                            }
                        </div>    
                    </div>    
                )}

            </div>

            {/* Variant Selection  */}
            {/* <div className="space-y-5"> */}

                {/* Color  */}
                {/* {variants.some((variant) => variant.color) && (
                    <div>
                        <p
                            className={`mb-2 font-medium ${
                                dark ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            Color
                        </p>

                        <div>
                            {variants
                                .filter((variant) => variant.color)
                                .map((variant) => (
                                    <button
                                        key={variant.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedVariantId(variant.id)
                                        }
                                        className={`rounded border px-4 py-2 ${
                                            selectedVariantId === variant.id
                                                ? dark
                                                    ? "border-white bg-white text-black"
                                                    : "border-black bg-black text-white"
                                                : dark
                                                    ? "border-gray-600 text-white"
                                                    : "border-gray-300 text-gray-800"    
                                        }`}
                                    >
                                        {variant.color}
                                    </button>
                                ))
                            }
                        </div>   
                    </div>    
                )} */}

                {/* Storage  */}
                {/* {variants.some((variant) => variant.storage) && (
                    <div>
                        <p 
                            className={`mb-2 font-medium ${
                                dark ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            Storage
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {variants
                                .filter((variant) => variant.storage)
                                .map((variant) => (
                                    <button
                                        key={variant.id}
                                        type="button"
                                        onClick={() => setSelectedVariantId(variant.id)}
                                        className={`rounded border px-4 py-2 ${
                                            selectedVariantId === variant.id
                                                ? dark
                                                    ? "border-white bg-white text-black"
                                                    : "border-black bg-black text-white"
                                                : dark  
                                                    ? "border-gray-600 text-white"
                                                    : "border-gray-300 text-gray-800"
                                        }`}
                                    >
                                        {variant.storage}
                                    </button>
                                ))
                            }
                        </div>    
                    </div>    
                )} */}

                {/* Price */}
                <p
                    className={`text-xl font-bold ${
                        dark ? "text-white" : "text-gray-900"
                    }`}
                >
                    ₹{Number(selectedVariant.price).toLocaleString("en-IN")}
                </p>

                {/* Stock  */}
                <p
                    className={`text-sm ${
                        dark ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                    {selectedVariant.stock > 0
                        ? `Stock: ${selectedVariant.stock}`
                        : "Out of stock"
                    }
                </p>


                {/* Add to cart  */}
                <AddToCartButton
                    product={{
                        ...product,
                        price: selectedVariant.price,
                        stock: selectedVariant.stock,
                        image: selectedVariant.image || product.image,
                    }}
                    variants={variants}
                    selectedVariantId={selectedVariantId}
                    showQuantity
                    dark={dark}
                />
            </div>

        
    );
}