import api  from "../services/api";
import { useState,useEffect } from "react";


function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {

        api.get('courses/')
        .then((response) => {
            setCourses(response.data);
        })
        .catch((error) => {
            console.log(error);
        });


    }, []);

    return(
        <div>
            <h1>Available Courses</h1>

            {courses.map((course) => (
                <div key={course.id}>
                    
                    <h2>{course.title}</h2>

                    <p>{course.description}</p>

                    <p>
                        Mentor : {course.mentor_name}
                    </p>

                </div>
            ))}


        </div>

    );

}

export default CourseList;

