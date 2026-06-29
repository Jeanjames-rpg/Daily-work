import CourseList from "./Courselist";

import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";


function Home(){

    const[courses, setCourses] = useState([]);

    useEffect(()=>{
        api
        .get('courses/')
        .then((res)=>{
            setCourses(res.data);
        })
        .catch((err)=>{console.log(err)});
    },[]);


    const trendingCourses = [...courses]

    .sort((a,b) => 
        b.student_count - a.student_count
    )
    .slice(0,3);

    return (
        
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

        <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white">
            <div>
                <h1 className="text=5xl md:text-7xl font-extrabold leading-tight">
                    Learn Skills That 
                    <span className="block text-yellow-300">Advance Your Carrer</span>
                </h1>
        
            
                <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                    Learn from experienced mentors with hands-on projects and real-world examples.
                </p>

                <div className="mt-10 flex justify-center gap-4">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
                        Browse Courses
                    </button>

                    <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition">
                        Become a Mentor
                    </button>
                </div>

            </div>
                
        </section>    

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <h3 className="text-3xl font-bold text-blue-600">120+</h3>
                    <p className="text-gray-500">Courses</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <h3 className="text-3xl font-bold text-blue-600">15k+</h3>
                    <p className="text-gray-500">Students</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <h3  className="text-3xl font-bold text-blue-600">200+</h3>
                    <p className="text-gray-500">Mentors</p>
                </div>

                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <h3 className="text-3xl font-bold text-blue-600">98%</h3>
                    <p className="text-gray-500">Success Rate</p>
                </div>
            </div>

            {/* Courses section */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                {/* <h2 className="text=3xl font-bold text-center mb-8">OUR COURSES</h2> */}
                <div className="text-center mb-12">
                    <p className="text-blue-600 font-semibold uppercase tracking-widest">
                        Explore
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        Popular Courses
                    </h2>

                    <p className="text-gray-500 mt-3 ">
                        Start learning from industry professionals
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course)=>(
                        <CourseCard course={course} key={course.id}/>
                    ))}

                </div>
            </section>        
            

            {/* Trending courses */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <h3 className="text-3xl font-bold text-center mb-8">🔥 Trending Courses</h3>
        
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trendingCourses.map((course)=>(
                            <CourseCard course={course} key={course.id} />
                        ))}
                    </div>
            </section>

            <section className="bg-blue-600 text-white rounded-3xl my-20">
                <div className="max-w-5xl mx-auto px-10 py-20 text-center">
                    <h2 className="text-4xl font-bold">
                        Ready to start learning?
                    </h2>

                    <p className="mt-4 text-blue-300">
                        Join thousands of students already learning on our platform.
                    </p>

                    <button className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
                        Get Started
                    </button>

                </div>

            </section>

    </div>
    );
}

export default Home;