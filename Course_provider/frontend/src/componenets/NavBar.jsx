import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/NavBar.module.css"
import { FaBars, FaTimes } from "react-icons/fa";


function NavBar() {

    const [user ,setUser] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        // const token = localStorage.getItem("access");

        // if (token) {
        //     api.get("me/")
        //     .then((res)=>{
        //         setUser(res.data);
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //     });
        // }

        api.get("me/")
        .then((res)=>{
            setUser(res.data)
        })
        .catch((error)=>{
            console.log(error)
            alert(error)
            setUser(null)
        })


    },[]);

    // const logout = () => {
    //     localStorage.removeItem("access");
    //     localStorage.removeItem("refresh");
    //     localStorage.removeItem("user");

    //     navigate("/login");

    //     window.location.reload();
    // };

    const logout = async() => {
        try{
            await api.post("logout/");

            setUser(null);

            navigate("/login")

        }
        catch(error){
            console.log(error)
            alert(error)
        }
    }

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav>
            
             <div className="hidden md:flex items-center gap-4">
               
                <Link to="/" 
                className="text-white hover:text-indigo-600 font-medium transition-colors"
                >
                     Home
                </Link>

                <Link to='/courses'
                className="text-white hover:text-indigo-600 font-medium transition-colors"
                >
                    Courses
                </Link>

                {!user && (
                    <>
                        <Link to='/login'
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            Login
                        </Link>

                        <Link to='/register'
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Register
                        </Link>
                    
                    </>
                )}

                {user?.role === "student" &&(
                    <>
                        <Link to='/dashboard'
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to='/my-enrollments'
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            Enrolled
                        </Link>

                        <button onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

                {user?.role === "mentor" && (
                    <>
                        <Link to="/my-courses"
                        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                        >
                            My courses
                        </Link>

                        <Link to="/dashboard"
                        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to="/create"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Create Course
                        </Link>

                        <button onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>


            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden text-white text-2xl"
                onClick={()=> setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FaTimes/> : <FaBars/>}
            </button>


            {menuOpen &&(
                <div className="absolute right-0 mt-4 w-56 bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 rounded-lg p-5 flex flex-col gap-4 md:hidden">
               
                <Link to="/" 
                onClick={closeMenu}
                className="text-white hover:text-indigo-600 font-medium transition-colors"
                >
                     Home
                </Link>

                <Link to='/courses'
                onClick={closeMenu}
                className="text-white hover:text-indigo-600 font-medium transition-colors"
                >
                    Courses
                </Link>

                {!user && (
                    <>
                        <Link to='/login'
                        onClick={closeMenu}
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            Login
                        </Link>

                        <Link to='/register'
                        onClick={closeMenu}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Register
                        </Link>
                    
                    </>
                )}

                {user?.role === "student" &&(
                    <>
                        <Link to='/dashboard'
                        onClick={closeMenu}
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to='/my-enrollments'
                        onClick={closeMenu}
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            Enrolled
                        </Link>

                        <button onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

                {user?.role === "mentor" && (
                    <>
                        <Link to="/my-courses"
                        onClick={closeMenu}
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            My courses
                        </Link>

                        <Link to="/dashboard"
                        onClick={closeMenu}
                        className="text-white hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to="/create"
                        onClick={closeMenu}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Create Course
                        </Link>

                        <button onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>
            )}

        </nav>
    );

}

export default NavBar;