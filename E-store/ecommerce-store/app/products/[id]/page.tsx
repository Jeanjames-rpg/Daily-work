import AddToCartButton from "@/app/components/products/AddToCartButton";
import { prisma } from "@/lib/prisma";
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
    });

    if (!product) {
        notFound();
    }

    return (
        <section className="grid gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-white">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full object-cover"
                />
            </div>

            <div>
                <p className="text-sm font-medium text-indigo-600">
                    {product.category}
                </p>

                <h1 className="mt-2 text-4xl font-bold">
                    {product.title}
                </h1>

                <p className="mt-4 text-2xl font-bold text-indigo-600">
                    {product.price.toString()}
                </p>

                <p className="mt-6 text-gray-600 leading-7">
                    {product.description}
                </p>

                <p className="mt-6">
                    <span className="font-semibold">Stock:</span>{" "}
                    {product.stock}
                </p>

                <AddToCartButton
                    product={{
                        id: product.id,
                        name: product.title,
                        price: Number(product.price),
                        image: product.image,
                    }}
                />
            </div>

        </section>
    );
}