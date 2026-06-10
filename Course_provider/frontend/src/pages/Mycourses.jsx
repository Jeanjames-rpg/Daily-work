import api from "../services/api";
import { useEffect, useState } from "react";


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

                </div>
            ))}



        </div>
        


    );
}
export default Mycourses;