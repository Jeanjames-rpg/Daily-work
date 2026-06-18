import api  from "../services/api";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Courselist.module.css"


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
        
        <div className={styles.container}>
            <h1 className={styles.title}>Available Courses</h1>

            <div className={styles.grid}>
            {courses.map((course) => (
                
                <div className={styles.card} key={course.id}>
                    
                    <h2 className={styles.courseTitle}>{course.title}</h2>

                    <p className={styles.description}>{course.description}</p>

                    <p className={styles.mentor}>
                        Mentor : {course.mentor_name}
                    </p>

                    <Link 
                        className={styles.link}
                        to={`/courses/${course.id}`}>
                        <button className={styles.button}>View Details</button>
                    </Link>

                </div>
            ))}
            </div>

        </div>

    );

}

export default CourseList;

