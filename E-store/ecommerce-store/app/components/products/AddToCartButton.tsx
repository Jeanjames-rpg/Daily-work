"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";


type Variant ={
    id: number;
    sku: string;
    color: string | null;
    storage: string | null;
    price: string | number;
    stock: number;
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
};

export default function AddToCartButton({ product,variants = [], showQuantity = false, }: Props) {
    const { addToCart} = useCart();

    const [selectedVariantId, setSelectedVariantId] = useState(
        variants[0]?.id ?? null
    );

    const [quantity, setQuantity] = useState(1);

    const selectedVariant = variants.find(
        (variant) => variant.id === selectedVariantId
    );

    if (!selectedVariant) {
        return <p>No variant available.</p>;
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
                image: product.image,
                stock: selectedVariant.stock,
                variantId: selectedVariant.id,
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

        <div>
            
            {/* color */}
            {variants.some((variant) => variant.color) && (
                <div>
                    <p className="mb-2 font-medium">Color</p>

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
                                            ? "border-black bg-black text-white"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {variant.color}
                                </button>
                            ))
                        }
                    </div>    
                </div>    
            )}


            {/* Storage  */}
            {variants.some((variant) => variant.storage) && (
                <div>
                    <p className="mb-2 font-medium">Storage</p>

                    <div className="flex gap-2">
                        {variants
                            .filter((variant) => variant.storage)
                            .map((variant) => (
                                <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() => 
                                        setSelectedVariantId(variant.id)
                                    }
                                    className={`rounded border px-4 py-2 ${
                                        selectedVariantId === variant.id
                                            ? "border-black bg-black text-white"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {variant.storage}
                                </button>
                            ))}
                    </div>    
                </div>    
            )}

            {/* Price  */}
            <p className="text-xl font-bold">
                ₹{Number(selectedVariant.price).toLocaleString()}
            </p>


            {/* Stock  */}
            <p className="text-sm">
                Stock: {selectedVariant.stock}
            </p>

            {/* Stock status  */}
            <div>
                {selectedVariant.stock === 0 ? (
                    <p className="font-semibold text-red-600">
                        Out of Stock
                    </p>
                ) : selectedVariant.stock <= 5 ? (
                    <p className="font-semibold text-orange-600">
                        Only {selectedVariant.stock} left
                    </p>
                ) : (
                    <p className="font-semibold text-green-600">
                        In Stock
                    </p>
                )}
            </div>


            {/* Quantity  */}
            {showQuantity && (
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => 
                            setQuantity((q) => Math.max(1, q - 1))
                        }
                        className="rounded border px-3 py-1"
                    >
                        -
                    </button>

                    <span>{quantity}</span>

                    <button
                        type="button"
                        disabled={quantity >= selectedVariant.stock}
                        onClick={() => 
                            setQuantity((q) => q + 1)
                        }
                        className="rounded border px-3 py-1"
                    >
                        +
                    </button>

                </div>    
            )}

            <button
                type="button"
                disabled={selectedVariant.stock === 0}
                onClick={handleAddToCart}
                className="rounded bg-black px-6 py-3 text-white disabled:opacity-50"
            >
                {selectedVariant.stock === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
            </button>

        </div>
    );
}