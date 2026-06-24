import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/Header.module.css"
import logo from "../assets/logo2.PNG"

function Header() {

    const navigate = useNavigate();

    const logout= ()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    }

    return (
        <header className={styles.header}>

            <img src={logo} alt="Logo" className={styles.logo} />

            
            
            <nav>
                <Link to='/'><button className={styles.button}>Home</button></Link>

                <Link to="/login"><button className={styles.button}>Login</button></Link>

                <Link to='/register'><button className={styles.button}>Register</button></Link>

                <Link to='/courses'><button className={styles.button}>Courses</button></Link>

                <button onClick={logout} className={styles.button}>Log Out</button>
        
            </nav>
            
        </header>
    );
}

export default Header;