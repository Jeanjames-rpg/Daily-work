import { Link } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
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
            <h1>My courses</h1>

            {courses.map((course)=>(
                <div key={course.id}>
                    <h2>{course.title}</h2>

                    <p>{course.description}</p>

                    <p>Mentor:{course.mentor_name}</p>

                    <p>Students enrolled:{course.student_count}</p>

                    <Link to={`/courses/${course.id}/add-chapter`}>
                    <button>Add chapter</button>
                    </Link>

                    <Link to={`/courses/${course.id}/students`}><button>View students</button></Link>
                </div>
                // <div>
                // <CourseCard key={course.id} course={course} />

                // <Link to={`/courses/${course.id}/add-chapter`}>
                // <button>Add chapter</button>
                // </Link>

                // </div>

            ))}


        </div>
        
        


    );
}
export default Mycourses;