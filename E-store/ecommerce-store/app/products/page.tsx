import { prisma } from "@/lib/prisma";
import CategoryFilter from "../components/products/CategoryFilter";


export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            categoryRef: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    return (
        <section>
            <div className="mb-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                    Our Store
                </p>

                <h1 className="mt-2 text-4xl font-bold text-gray-300">
                    Explore Products
                </h1>

                <p className="mt-3 max-w-2xl text-gray-400">
                    Discover products across different categories and find
                    exactly what you are looking for.
                </p>
            </div>

            {/* {products.length === 0 ? (
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
            )} */}

            <CategoryFilter
                products={products.map((product) => ({
                    id: product.id,
                    name: product.title,
                    price: Number(product.price),
                    image: product.image,
                    categoryId: product.categoryId,
                    categoryName: product.categoryRef.name,
                    stock: product.stock,
                }))}

                categories={categories}
            />
        </section>
    )
}