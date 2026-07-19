import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css"


function Dashboard (){
    const [user, setUser] = useState(null);

    useEffect(() => {
        api
        .get('me/')
        .then((res) => {
            setUser(res.data);
        });
    
    },[]);

    return (

        // <div className={styles.container}>

        // <div className={styles.card}>
        //     {user &&(
        //         <>
        //             <h1 className={styles.title}>Welcome {user.username}</h1>
        //             <h2 className={styles.role}>Role : {user.role}</h2>

        //         </>
        //     )}

        //     <div className={styles.links}>
        //         <Link to='/courses'>See Available Courses</Link>
        //     </div>

        //     {user?.role === 'mentor' &&(
        //         <Link to='/create'>
        //             <button className={styles.button} >Create Course</button>
        //         </Link>
        //     )}

        //     {user?.role === 'mentor' &&(
        //         <Link to='/my-courses'>
        //             <button className={styles.button} >My courses</button>
        //         </Link>
        //     )}

        //     {user?.role === 'student' &&(
        //         <Link to="/my-enrollments">
        //             <button className={styles.button}>My Enrolments</button>
        //         </Link>
        //     )}

        //     <div>
        //         <Link className={styles.links} to='/'>Return to Home?</Link>
        //     </div>
            
        // </div>

        // </div>


        <div className="min-h-screen bg-gray-100">
           
           
            <div className="bg-white shadow-sm border-b">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="mt-2 text-gray-500">
                        Welcome Back! Manage Your courses and learning from here.
                    </p>
                </div>
            </div>


            <div className="mx-auto max-w-7xl px-6 py-10">

                {user && (
                    <div className="mb-8 flex items-center gap-5 rounded-2xl bg-white p-6 shadow-md">
                        
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                            {user.username.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Welcome, {user.username}
                            </h2>
                            <p className="mt-1 text-gray-500">
                                Role:{" "}
                                <span className="rounded bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700">
                                    {user.role}
                                </span>
                            </p>

                            <Link to='/user/update'
                             className="mt-3 inline-block rounded-lg bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 px-4 py-2 font-medium text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                Edit Profile
                            </Link>
                          
                        </div>

                    </div>
                )}


                <h2 className="mb-5 text-xl font-semibold text-gray-700">
                    Quick Actions
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Link to="/courses"
                    className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <h3 className="text-lg font-semibold text-blue-600">📚 Browse Courses</h3>

                        <p className="mt-2 text-gray-500">
                            Explore all available courses.
                        </p>
                    </Link>

                    {user?.role === "mentor" &&(
                        <>
                            <Link to='/create'
                             className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <h3 className="text-lg font-semibold text-green-600">
                                    ➕ Create Course
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Publish a new course for students.
                                </p>
                            
                            </Link>

                            <Link to='/my-courses'
                             className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <h3 className="text-lg font-semibold text-purple-600">
                                   🎓  My Courses
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Manage your existing courses.
                                </p>
                            </Link>
                        </>
                    )}


                    {user?.role === "student" && (
                        <Link
                            to="/my-enrollments"
                            className="rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <h3 className="text-lg font-semibold text-orange-600">
                                ✅ MY Enrollments
                            </h3>

                            <p className="mt-2 text-gray-500">
                                Continue learning from your enrolled courses.
                            </p>
                        </Link>
                    )}
                </div>

                <div className="mt-10">
                    <Link 
                    to='/'
                    className="font-medium text-blue-600 transition hover:text-blue-800">
                         ← Return to Home
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;