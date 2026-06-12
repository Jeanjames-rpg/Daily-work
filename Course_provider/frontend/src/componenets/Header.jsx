import "../styles/Header.css";
import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="header">

            <div className="logo">Course Provider Web</div>
            
            <nav>
                <Link to='/'>Home</Link>

                <Link to="/login">Login</Link>

                <Link to='/register'>Register</Link>

        
            </nav>

        </header>
    );
}

export default Header;