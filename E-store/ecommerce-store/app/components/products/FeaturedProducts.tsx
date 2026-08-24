import { prisma } from "@/lib/prisma";
import ProductCard from "./Productcard";


// const products = [
//    {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 2999,
//     image: "https://picsum.photos/400/400?random=1",
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 4999,
//     image: "https://picsum.photos/400/400?random=2",
//   },
//   {
//     id: 3,
//     name: "Gaming Mouse",
//     price: 1999,
//     image: "https://picsum.photos/400/400?random=3",
//   },
//   {
//     id: 4,
//     name: "Laptop Backpack",
//     price: 1499,
//     image: "https://picsum.photos/400/400?random=4",
//   },
// ];

export default async function FeaturedProducts(){
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  
    return (
        <section className="py-16">
            <h2 className="text-4xl font-bold text-center mb-10">
                Featured Products
            </h2>

            {/* <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div> */}

            {products.length === 0 ? (
              <p className="text-center text-gray-500">
                No products available
              </p>
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
    );
}