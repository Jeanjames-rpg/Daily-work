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
        

        <div>
            <h1 className="text-center font-bold mb-8  text-3xl">My courses</h1>

            {courses.map((course)=>(
                <div key={course.id} className={styles.card}>
                    <h2 className={styles.title}>{course.title}</h2>

                    <p className={styles.description}>{course.description}</p>

                    <p className={styles.mentor}>Mentor:{course.mentor_name}</p>

                    <p className={styles.student_count}>Students enrolled:{course.student_count}</p>

                    <Link to={`/courses/${course.id}/add-chapter`}>
                    <button className={styles.button}>Add chapter</button>
                    </Link>
                    
                    <Link to={`/courses/update/${course.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Update Course
                    </Link>

                    <Link>
                        Delete Course
                    </Link>

                    <Link to={`/courses/${course.id}/students`}><button className={styles.button}>View students</button></Link>
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