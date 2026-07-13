import { Link } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import CourseCard from "../componenets/CourseCard";
import styles from "../styles/Mycourses.module.css"

function Mycourses(){

    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        api
        .get("courses/my-courses/")
        .then((res)=>{
            setCourses(res.data)
        });
    },[]);


    return(
        

        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-center font-bold mb-8  text-3xl">My courses</h1>

            <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">

            {courses.map((course)=>(
                <div key={course.id} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                   
                    <img src={course.image} alt={course.title} className="h-48 w-full object-cover rounded-lg"/>

                    <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>

                    <p className="text-gray-600">{course.description}</p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Mentor:</span>{" "}
                        {course.mentor_name}
                    </p>

                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Students enrolled:</span>{" "}
                        {course.student_count}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-3">
                  
                    <Link to={`/courses/${course.id}/add-chapter`}
                        className="bg-gradient-to-r from-lime-300 to-green-500 hover:from-lime-400 hover:to-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Add Chapter
                    </Link>
                    
                    <Link to={`/courses/update/${course.id}`}
                        className="bg-gradient-to-l from-fuchsia-400 to-purple-600 hover:from-fuchsia-500 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                        Update Course
                    </Link>

                    <Link to={`/courses/${course.id}/students`}
                     className="bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                        View students
                    </Link>

                    <button
                    className="bg-gradient-to-l from-rose-400 to-red-600 text-white px-4 py-2 rounded-lg hover:from-rose-500 hover:to-red-700 transition"
                    >
                        Delete Course
                    </button>

                    </div>

                </div>
                

            ))}

            </div>

        </div>
        
        


    );
}
export default Mycourses;