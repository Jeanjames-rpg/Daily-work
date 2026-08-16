import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/NavBar.module.css"
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence,motion } from "framer-motion";


function NavBar() {

    const [user ,setUser] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

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

        if (location.pathname ==='/login' || location.pathname === '/register'){
            setUser(null);
            return;
        }

        api.get("me/")
        .then((res)=>{
            setUser(res.data)
        })
        .catch((error)=>{
            if (error.response?.status === 401) {
                setUser(null);
                return;
            }

            console.log(error);
        })


    },[location.pathname]);

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

        }
        catch(error){
            console.log(error);
        }
        finally{
            setUser(null);
            localStorage.removeItem("user");
            navigate("/login");
        }
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav>
            
             <div className="hidden md:flex items-center gap-4">
               
                <Link to="/" 
                className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
                >
                     Home
                </Link>

                <Link to='/courses'
                className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
                >
                    Courses
                </Link>

                {!user && (
                    <>
                        <Link to='/login'
                        className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
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
                        className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to='/my-enrollments'
                        className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
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
                        className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
                        >
                            My courses
                        </Link>

                        <Link to="/dashboard"
                        className="text-slate-700 hover:text-indigo-600 font-medium transition-colors"
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
                className="md:hidden text-slate-700 text-2xl"
                onClick={()=> setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FaTimes/> : <FaBars/>}
            </button>

          <AnimatePresence>
            {menuOpen &&(
                <motion.div 
                    initial={{ opacity:0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1}}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-4 top-20 w-56 rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 md:hidden space-y-1">
               
                <Link to="/" 
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                >
                     Home
                </Link>

                <Link to='/courses'
                onClick={closeMenu}
                className="block rounded-lg text-center px-4 py-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                >
                    Courses
                </Link>

                {!user && (
                    <>
                        <Link to='/login'
                        onClick={closeMenu}
                        className="block text-center rounded-lg px-4 py-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Login
                        </Link>

                        <Link to='/register'
                        onClick={closeMenu}
                        className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Register
                        </Link>
                    
                    </>
                )}

                {user?.role === "student" &&(
                    <>
                        <Link to='/dashboard'
                        onClick={closeMenu}
                        className="block rounded-lg px-4 py-3 text-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to='/my-enrollments'
                        onClick={closeMenu}
                        className="block rounded-lg px-4 py-3 text-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Enrolled
                        </Link>

                        <button onClick={logout}
                        className="block w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

                {user?.role === "mentor" && (
                    <>
                        <Link to="/my-courses"
                        onClick={closeMenu}
                        className="block rounded-lg px-4 py-3 text-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                        >
                            My courses
                        </Link>

                        <Link to="/dashboard"
                        onClick={closeMenu}
                        className="block rounded-lg px-4 py-3 text-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to="/create"
                        onClick={closeMenu}
                        className="block w-full bg-green-500 text-center text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            Create Course
                        </Link>

                        <button onClick={logout}
                        className="block w-full rounded-lg bg-red-500 text-white px-4 py-2  hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

            </motion.div>
            
            )}
            </AnimatePresence>
        </nav>
    );

}

export default NavBar;