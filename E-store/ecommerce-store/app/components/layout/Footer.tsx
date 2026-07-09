export default function Footer() {
    return (
        <footer className="border-t bg-white mt-10">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} E-Store. All rights reserved.
                </p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="text-gray-600 hover:text-shadow-indigo-600">
                        Privacy
                    </a>

                    <a href="#" className="text-gray-600 hover:text-shadow-pink-600">
                        Terms
                    </a>

                    <a href="#" className="text-gray-600 hover:text-shadow-indigo-600">
                        Contact
                    </a>
                </div>


            </div>
        </footer>
    )
}