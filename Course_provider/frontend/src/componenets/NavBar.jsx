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
            
            <div className={styles.links}>
                <Link to="/" >
                        <button>Home</button>
                </Link>

                <Link to='/courses'>
                    <button>Courses</button>
                </Link>

                {!user && (
                    <>
                        <Link to='/login'>
                            <button>Login</button>
                        </Link>

                        <Link to='/register'>
                            <button>Register</button>
                        </Link>
                    
                    </>
                )}

                {user?.role === "student" &&(
                    <>
                        <Link to='/dashboard'>
                            <button>Dashboard</button>
                        </Link>

                        <Link to='/my-enrollments'>
                            <button>Enrolled</button>
                        </Link>

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                )}

                {user?.role === "mentor" && (
                    <>
                        <Link to="/my-courses">
                            <button>My courses</button>
                        </Link>

                        <Link to="/dashboard">
                            <button>Dashboard</button>
                        </Link>

                        <Link to="/create">
                            <button>Create Course</button>
                        </Link>

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );

}

export default NavBar;