import api  from "../services/api";
import { useState,useEffect } from "react";
import "../styles/Courselist.css";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import Main from "../componenets/Main";
import { Link } from "react-router-dom";


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

        


        
        <div className="course-container">
            <h1>Available Courses</h1>

            <div className="course-grid">
            {courses.map((course) => (
                
                <div className="course-card" key={course.id}>
                    
                    <h2>{course.title}</h2>

                    <p>{course.description}</p>

                    <p>
                        Mentor : {course.mentor_name}
                    </p>

                    <Link to={`/courses/${course.id}`}>
                        <button>View Details</button>
                    </Link>

                </div>
            ))}
            </div>

        </div>

        
        
        

        </div>
    );

}

export default CourseList;

