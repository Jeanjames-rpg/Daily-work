"use client";

import { useState } from "react";
import ProductCard from "./Productcard";


type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    categoryId: number;
};

type Category = {
    id: number;
    name: string;
};

type Props = {
    products: Product[];
    categories: Category[];
};

export default function CategoryFilter(
    { products, categories, } : Props
){
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredProducts =
         selectedCategory === "all"
            ? products
            : products.filter(
                (product) => product.categoryId === Number(selectedCategory)
            );
    
    return (
        <div className="mb-10">
            <div  className="mb-4">
                <h2 className="text-xl font-semibold text-white">
                    Browse by Category
                </h2>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                        selectedCategory === "all"
                            ? "bg-indigo-600 text-white shadow-md"
                            : "border border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-600"
                    }`}
                >
                    All
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(String(category.id))}
                        className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                            selectedCategory === String(category.id)
                                ? "bg-indigo-600 text-white shadow-md"
                                : "border border-gray-200 bg-gray-100 text-gray-700 hover:border-indigo-300 hover:text-indigo-600"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}    

            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-gray-500">
                    No products available in this category.
                </p>
            ):(
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            )}
        </div>
    );        

}