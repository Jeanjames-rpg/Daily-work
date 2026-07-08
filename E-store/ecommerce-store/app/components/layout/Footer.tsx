export default function Footer() {
    return (
        <footer>
            <div>
                <p>
                    © {new Date().getFullYear()} E-Store. All rights reserved.
                </p>

                <div>
                    <a href="#" className="hover:text-shadow-indigo-600">
                        Privacy
                    </a>

                    <a href="#" className="hover:text-shadow-indigo-600">
                        Terms
                    </a>

                    <a href="#" className="hover:text-shadow-indigo-600">
                        Contact
                    </a>
                </div>


            </div>
        </footer>
    )
}