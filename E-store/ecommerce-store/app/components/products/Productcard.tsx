import Image from "next/image";
import Link from "next/link";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

export default function ProductCard({product}: {product:Product}) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            
          <Link href={`/products/${product.id}`}>  
            <img
                src={product.image}
                alt={product.name}
                // width={400}
                // height={400}
                className="h-60 w-full object-cover"
            />

            <div className="p-4">
                <h3 className="text-xl text-indigo-950 font-semibold">{product.name}</h3>

                <p className="text-indigo-600 font-bold mt-2">
                    ₹{product.price}
                </p>
            </div>
          </Link>  
            <div className="px-4 pb-4">
                <button className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}