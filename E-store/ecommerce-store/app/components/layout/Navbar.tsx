

export default function Navbar(){

    return(

        <nav className="bg-green shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center">
                   
                    <h1 className="text-2xl font-bold text-indigo-600">
                        E-store
                    </h1>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/" className="hover:text-emerald-600">
                            Home
                        </a>

                        <a href="/products" className="hover:text-emerald-600">
                            Products
                        </a>

                        <a href="/cart" className="hover:text-emerald-600">
                            Cart
                        </a>

                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 rounded-lg border text-cyan-800 hover:bg-gray-100">
                            Login
                        </button>

                        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-shadow-indigo-400 hover:bg-indigo-700">
                            Register
                        </button>

                    </div>

                </div>
            </div>

        </nav>
    )
}