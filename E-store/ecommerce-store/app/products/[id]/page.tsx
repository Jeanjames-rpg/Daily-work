// import AddToCartButton from "@/app/components/products/AddToCartButton";
import ProductDetailsClient from "@/app/components/products/ProductDetailsClient";
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
            variants: true,
        },
    });

    console.log(product?.variants);

    if (!product) {
        notFound();
    }

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
        {/* <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
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
        </div> */}

        {/* Product Information */}
        <div className="flex flex-col justify-center">

            <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
                {product.categoryRef?.name || "No category"}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-white">
                {product.title}
            </h1>

           
            <p className="mt-6 leading-7 text-gray-300">
                {product.description}
            </p>

           
            

            <div className="mt-8">
                {/* <AddToCartButton
                    product={{
                        id: product.id,
                        name: product.title,
                        price: Number(product.price),
                        image: product.image,
                        stock: product.stock,
                        // variantId: product.variants[0]?.id ?? 0,
                        // color: product.variants[0]?.color ?? null,
                        // storage: product.variants[0]?.storage ?? null,
                    }}
                    variants={product.variants.map((variant) => ({
                        id: variant.id,
                        sku: variant.sku,
                        color: variant.color,
                        storage: variant.storage,
                        price: Number(variant.price),
                        stock: variant.stock,
                        image: variant.image,
                    }))}
                    showQuantity
                    dark
                /> */}

                <ProductDetailsClient
                    product={{
                        id: product.id,
                        name: product.title,
                        price: Number(product.price),
                        image: product.image,
                        stock: product.stock,
                    }}
                    varaints={product.variants.map((variant) => ({
                        id: variant.id,
                        sku: variant.sku,
                        color: variant.color,
                        storage: variant.storage,
                        price: Number(variant.price),
                        stock: variant.stock,
                        image: variant.image,
                    }))}
                    dark
                />
            </div>
        </div>
    </section>
   </>  
);    
}