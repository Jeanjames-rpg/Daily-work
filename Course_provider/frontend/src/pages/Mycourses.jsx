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

    const togglePublish = async (course) => {
        try {
            const response = await api.patch(
                `courses/${course.id}/publish/`
            );

            setCourses((prevCourses) => 
                prevCourses.map((item) => 
                    item.id === course.id ? {
                        ...item,
                        is_published: response.data.is_published
                    }
                    : item
                )
            );

            
        } catch (error) {
            console.log(error);
        }
    };


    return(
        

        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-center font-bold mb-8  text-3xl">My courses</h1>

            <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">

            {courses.map((course)=>(
                <div key={course.id} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                   
                {course.is_published ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Public
                    </span>
                ):(
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-semibold shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        Private
                    </span>
                )}

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

                    <p className="text-2xl font-bold text-green-600 mt-3">
                        ₹{course.price}
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

                    <Link to={`/courses/${course.id}`}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white transition duration-300"
                    >
                        View Details

                    </Link>

                    <button 
                     onClick={() => togglePublish(course)}
                     className={
                        course.is_published
                            ? "bg-gradient-to-l from-gray-500 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-800 transition"
                            : "bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-green-700 transition"
                     }

                     >
                        {course.is_published ? "Make Private" : "Publish Course"}
                    </button>


                    </div>

                </div>
                

            ))}

            </div>

        </div>
        
        


    );
}
export default Mycourses;