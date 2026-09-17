import AddToCartButton from "@/app/components/products/AddToCartButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";


type Props = {
    params: Promise<{id: string;}>;
};

export default async function ProductDetails({params}:Props) {
    const {id} = await params;

    const product = await prisma.product.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            categoryRef: true,
        },
    });

    if (!product) {
        notFound();
    }

    // return (
    //     <section className="grid gap-10 md:grid-cols-2">
    //         <div className="overflow-hidden rounded-2xl bg-white">
    //             <img
    //                 src={product.image}
    //                 alt={product.title}
    //                 className="w-full object-cover"
    //             />
    //         </div>

    //         <div>
    //             <p className="text-sm font-medium text-indigo-600">
    //                 {product.categoryRef?.name || "No category"}
    //             </p>

    //             <h1 className="mt-2 text-4xl font-bold">
    //                 {product.title}
    //             </h1>

    //             <p className="mt-4 text-2xl font-bold text-indigo-600">
    //                 {product.price.toString()}
    //             </p>

    //             <p className="mt-6 text-gray-600 leading-7">
    //                 {product.description}
    //             </p>

    //             <p className="mt-6">
    //                 <span className="font-semibold">Stock:</span>{" "}
    //                 {product.stock}
    //             </p>

    //             <AddToCartButton
    //                 product={{
    //                     id: product.id,
    //                     name: product.title,
    //                     price: Number(product.price),
    //                     image: product.image,
    //                     stock: product.stock,
    //                 }}
    //             />
    //         </div>

    //     </section>
    // );
return (
   <>
    <Link
        href="/products"
        className="mb-8 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
    >
        ← Back to Products
    </Link>

    <section className="grid gap-10 md:grid-cols-2">

        {/* Product Image */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {product.image ? (
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full max-h-150 w-full object-cover"
                />
            ) : (
                <div className="flex h-100 items-center justify-center text-gray-400">
                    No image available
                </div>
            )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">

            <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
                {product.categoryRef?.name || "No category"}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-white">
                {product.title}
            </h1>

            <p className="mt-5 text-3xl font-bold text-indigo-600">
                ₹{product.price.toString()}
            </p>

            <p className="mt-6 leading-7 text-gray-300">
                {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
                {product.stock === 0 ? (
                    <p className="font-semibold text-red-600">
                        Out of Stock
                    </p>
                ) : product.stock <= 5 ? (
                    <p className="font-semibold text-orange-600">
                        Only {product.stock} left
                    </p>
                ) : (
                    <p className="font-semibold text-green-600">
                        In Stock
                    </p>
                )}
            </div>

            <div className="mt-8">
                <AddToCartButton
                    product={{
                        id: product.id,
                        name: product.title,
                        price: Number(product.price),
                        image: product.image,
                        stock: product.stock,
                    }}
                    showQuantity
                />
            </div>
        </div>
    </section>
   </>  
);    
}