"use client";

import React, {  useEffect, useState } from "react";


type Product = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    stock: number;
    category: string;
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("")

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    
    const [editingProduct, setEditingProduct] = useState<Product | null >(null);
    const [isEditing, setIsEditing] = useState(false);

    async function fetchProducts() {
        try {
            const response = await fetch("/api/admin/products");
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to load products.");
                return;
            }

            setProducts(data.products);
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    function handleEdit(product: Product) {
        setEditingProduct(product);

        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.image);
        setStock(String(product.stock));
        setCategory(product.category);

        setIsEditing(true);
    }

async function handleDelete(id: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if(!confirmed) {
            return;
        }

        setMessage("");
        setError("");

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: "DELETE",
            });
            
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to delete product.");
                return;
            }

            setMessage("Product deleted successfully.");

            fetchProducts();
        } catch {
            setError("Something went wrong.");
        }
    }
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setMessage("");
        setError("");

        try {

            const url = isEditing
                ? `/api/admin/products/${editingProduct?.id}`
                : "/api/admin/products";
            
            const method = isEditing ? "PATCH" : "POST";

            const response = await fetch(url,{
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    price: Number(price),
                    image,
                    stock: Number(stock),
                    category,
                }),
            });
            
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Failed to create product.");
                return;
            }

            setMessage(isEditing ? "Product updated successfully." : "Product created  successfully.");

            setTitle("");
            setDescription("");
            setPrice("");
            setImage("");
            setStock("");
            setCategory("");

            setEditingProduct(null);
            setIsEditing(false);

            fetchProducts();
        } catch {
            setError("Something went wrong.");
        }
    }

    if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-12">
                <p>Loading products..</p>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Product Management
                </h1>

                <p className="mt-2 text-gray-500">
                    Add and manage products in your store.
                </p>
            </div>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-700">
                    {isEditing ? "Edit Product" : "Add Product"}
                </h2>

                {message && (
                    <div className="mt-4 rounded-lg bg-green-100 p-3 text-green-700">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mt-4 rounded-lg bg-red-100 p-3 text-red-700">
                        {error}
                    </div>
                )}

                <form 
                    onSubmit={handleSubmit}
                    className="mt-6 grid gap-5 md:grid-cols-2 text-slate-600"
                >
                    <input type="text" placeholder="Product title" value={title} onChange={(e)=>setTitle(e.target.value)} 
                        className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
                        className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.01"
                        className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} min="0"
                        className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />

                    <input
                        type="text" placeholder="Image path, e.g. /images/headphones.jpg" value={image} onChange={(e) => setImage(e.target.value)}
                        className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                        required
                    />

                    <textarea 
                        placeholder="Product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
                        required
                    />

                    <button
                        type="submit"
                        className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 md:col-span-2"
                    >
                        {isEditing ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </section>

            {/* product list  */}
            <section className="mt-10">
                <h2 className="mb-5 text-2xl font-semibold">
                    Products
                </h2>

                {products.length === 0 ? (
                    <div className="rounded-xl border p-8 text-center text-gray-500">
                    No products found.
                    </div>
                ):(
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-2xl border bg-white p-6 shadow-sm text-slate-700"
                            >
                                <h3 className="text-xl font-bold">
                                    {product.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    {product.description}
                                </p>

                                <div className="mt-4 space-y-2">
                                    <p>
                                        <span className="font-semibold">
                                            Price:
                                        </span>{" "}
                                        ₹{Number(product.price).toFixed(2)}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Stock:
                                        </span>{" "}
                                        {product.stock}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Category:
                                        </span>{" "}
                                        {product.category}
                                    </p>

                                    <div className="mt-5 flex gap-3">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                        >
                                            Edit 
                                        </button>

                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>    
                                </div>    
                            </div>    
                        ))}
                    </div>
                )}

               
            </section>
        </main>
    );
}