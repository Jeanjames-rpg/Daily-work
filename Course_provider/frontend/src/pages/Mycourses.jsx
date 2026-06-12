import { Link } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import Main from "../componenets/Main";
import CourseCard from "../componenets/CourseCard";


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
        <div>

        <div>
            <h1>My courses</h1>

            {courses.map((course)=>(
                // <div key={course.id}>
                //     <h2>{course.title}</h2>

                //     <p>{course.description}</p>

                //     <p>Mentor:{course.mentor_name}</p>

                // </div>

                <CourseCard key={course.id} course={course}/>



            ))}

            <diV>
                <Link to='/'>Return to home?</Link>
            </diV>

        </div>
        
        </div>


    );
}
export default Mycourses;