import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/Header.module.css"
import logo from "../assets/logo2.PNG"
import NavBar from "./NavBar";

function Header() {

    const navigate = useNavigate();

    const logout= ()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    }

    return (
        <header className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            
             <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className={styles.logo} />

                <h1 className="text-2xl font-bold text-indigo-600">
                    Hive
                </h1>
            
             </div>
            

             <NavBar/>
            </div>
        </header>
    );
}

export default Header;