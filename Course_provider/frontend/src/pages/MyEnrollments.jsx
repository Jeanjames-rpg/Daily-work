import { useState, useEffect } from "react";

import api from "../services/api";
import { Link } from "react-router-dom";
import CourseCard from "../componenets/CourseCard";

function MyEnrollments() {

    const [enrollments, setEnrollments] = useState([]);


    useEffect(()=> {
        api
        .get("courses/my-enrollments/")
        .then((res) =>{
            setEnrollments(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });

    },[]);
    console.log(enrollments); 
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Enrolled Courses
            </h1>

            {enrollments.length === 0 ? (

                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">
                        You havent enrolled in any courses yet.
                    </p>

                    <Link
                        to='/courses'
                        className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse Courses
                    </Link>
                </div>   
            ):(
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {
                enrollments.map(
                    (item)=> (
                        <CourseCard key={item.id} course={item.course}/>
                    )
                )
            }

                </div>

            )}

            

        </div>
    );

}

export default MyEnrollments;