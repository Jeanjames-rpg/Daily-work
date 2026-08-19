import { prisma } from "@/lib/prisma";
import ProductCard from "../components/products/Productcard";


export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <section>
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    All Products
                </h1>

                <p className="mt-2 text-gray-600">Browse our complete collection.</p>
            </div>

            {products.length === 0 ? (
                <p className="text-gray-500">No products available</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.title,
                                price: Number(product.price),
                                image: product.image,
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}