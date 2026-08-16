import { Link,  } from "react-router-dom"
import styles from "../styles/Header.module.css"
import logo from "../assets/logo2.PNG"
import NavBar from "./NavBar";

function Header() {

   

    return (
         <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">

            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
             <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />

                <h1 className="text-2xl font-bold text-indigo-300">
                    Hive
                </h1>
            
             </div>
            

             <NavBar/>
            </div>
        </header>
    );
}

export default Header;