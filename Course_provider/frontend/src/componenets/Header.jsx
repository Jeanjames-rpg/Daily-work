import { Link,  } from "react-router-dom"
import styles from "../styles/Header.module.css"
import logo from "../assets/logo2.PNG"
import NavBar from "./NavBar";

function Header() {

   

    return (
         <header className="bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            
             <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className={styles.logo} />

                <h1 className="text-2xl font-bold text-white">
                    Hive
                </h1>
            
             </div>
            

             <NavBar/>
            </div>
        </header>
    );
}

export default Header;