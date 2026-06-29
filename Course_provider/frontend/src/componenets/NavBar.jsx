import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/NavBar.module.css"


function NavBar() {

    const [user ,setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("access");

        if (token) {
            api.get("me/")
            .then((res)=>{
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    },[]);

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");

        window.location.reload();
    };

    return (
        <nav>
            
             <div className="flex items-center gap-4">
               
                <Link to="/" 
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                     Home
                </Link>

                <Link to='/courses'
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                    Courses
                </Link>

                {!user && (
                    <>
                        <Link to='/login'
                        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
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
                        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Dashboard
                        </Link>

                        <Link to='/my-enrollments'
                        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
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

        </nav>
    );

}

export default NavBar;