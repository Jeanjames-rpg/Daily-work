import Link from "next/link";


export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl">
            <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                    <p className="text-sm uppercase tracking-widest text-indigo-100">
                        New Collections
                    </p>

                    <h1 className="mt-4 text-5xl font-bold leading-tight">
                        Discover Amazing Products
                    </h1>

                    <p className="mt-6 text-lg text-indigo-100">
                        Shop electronics , fashion, accessories, and much more at great prices.
                    </p>

                    <Link href="/products"
                    className="inline-block mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 hover:bg-gray-100">
                        Shop Now
                    </Link>
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-72 w-72 rounded-full bg-white/10 flex items-center justify-center text-8xl">
                       🛍️
                    </div>
                </div>
            </div>
        </section>
    )
}