"use client";

import { useState } from "react";
import ProductCard from "./Productcard";


type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    categoryId: number;
    categoryName?: string;
    stock:  number;
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
    const [search, setSearch] = useState("");

    // const filteredProducts =
    //      selectedCategory === "all"
    //         ? products
    //         : products.filter(
    //             (product) => product.categoryId === Number(selectedCategory)
    //         );

    const normalizedSearch = search.toLowerCase().replace(/\s+/g, "");

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "all" || product.categoryId === Number(selectedCategory);

        const normalizedProductName = product.name.toLowerCase().replace(/\s+/g, "");

        // const matchesSearch = normalizedProductName.includes(normalizedSearch);
        const normalizedCategoryName = (product.categoryName || "").toLowerCase().replace(/\s+/g, "");

        const matchesSearch = 
            normalizedProductName.includes(normalizedSearch) ||
            normalizedCategoryName.includes(normalizedSearch);

        return matchesCategory && matchesSearch;
    });
    
    return (
        <div className="relative mb-10">

            <div className="mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 pr-12 text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                />

                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

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

            <p className="mb-6 text-sm text-gray-200">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            {filteredProducts.length === 0 ? (
                // <p className="text-gray-500">
                //     No products available in this category.
                // </p>
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                    <h3 className="text-lg font-semibold text-slate-700">
                        No products found.
                    </h3>
                    
                    <p className="mt-2 text-sm text-gray-500">
                        Try a different search or category.
                    </p>

                    {(search || selectedCategory !== "all") && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("all");
                            }}
                            className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Clear filters
                        </button>
                    )}
                </div>    
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