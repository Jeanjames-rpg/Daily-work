import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/Header.module.css"

function Header() {

    const navigate = useNavigate();

    const logout= ()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    }

    return (
        <header className={styles.header}>

            <div className={styles.logo}>Course Provider Web</div>
            
            <nav>
                <Link to='/'>Home</Link>

                <Link to="/login">Login</Link>

                <Link to='/register'>Register</Link>

                <Link to='/courses'>Courses</Link>

                <button onClick={logout} className={styles.button}>Log Out</button>
        
            </nav>
            
        </header>
    );
}

export default Header;