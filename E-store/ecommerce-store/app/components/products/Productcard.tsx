import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
    categoryName?: string;
};

export default function ProductCard({product}: {product:Product}) {
    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            
          <Link href={`/products/${product.id}`}>  
            <div className="h-60 overflow-hidden bg-gray-100">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                            No image
                    </div>
                )}
            </div>
            

            <div className="p-5">

                {product.categoryName && (
                        <p className="text-sm font-medium text-indigo-500">
                            {product.categoryName}
                        </p>
                )}

                <h3 className="mt-1 text-xl font-semibold text-slate-800">{product.name}</h3>

                <p className="text-indigo-600 text-lg font-bold mt-2">
                    ₹{product.price}
                </p>

                {product.stock === 0 ? (
                    <p className="mt-2 text-sm font-medium text-red-600">
                        Out of Stock
                    </p>
                ) : product.stock <= 5 ? (
                    <p className="mt-2 text-sm font-medium text-orange-600">
                        Only {product.stock} left
                    </p>
                ) : (
                    <p className="mt-2 text-sm font-medium text-green-600">
                        In Stock
                    </p>
                )
                }

            </div>
          </Link>  
            <div className="px-5 pb-5">
                
                <AddToCartButton product={product} />
            </div>
        </div>
    );
}