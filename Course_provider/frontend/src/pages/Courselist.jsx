import api  from "../services/api";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Courselist.module.css"
import SearchBar from "../componenets/SearchBar";
import CourseCard from "../componenets/CourseCard";


function CourseList() {
    const [courses, setCourses] = useState([]);

    const [Search, setSearch] = useState("");

    useEffect(() => {

        api.get('courses/')
        .then((response) => {
            setCourses(response.data);
        })
        .catch((error) => {
            console.log(error);
        });


    }, []);

    const filteredCourses = courses.filter(
        (course)=>
            course.title
        .toLowerCase()
        .includes(Search.toLowerCase())
    );

    return(
        
        <div className={styles.container}>
            <h1 className={styles.title}>Available Courses</h1>

            {/* <input type="text" placeholder="search" value={Search} onChange={(e)=> setSearch(e.target.value)} /> */}
            <SearchBar value={Search} onChange={(e)=> setSearch(e.target.value)} />

            <div className={styles.grid}>
            {filteredCourses.map((course) => (
                
                // <div className={styles.card} key={course.id}>
                    
                //     <h2 className={styles.courseTitle}>{course.title}</h2>

                //     <p className={styles.description}>{course.description}</p>

                //     <p className={styles.mentor}>
                //         Mentor : {course.mentor_name}
                //     </p>

                //     <Link 
                //         className={styles.link}
                //         to={`/courses/${course.id}`}>
                //         <button className={styles.button}>View Details</button>
                //     </Link>

                // </div>

                <CourseCard course={course} key={course.id} />
            ))}
            </div>

        </div>

    );

}

export default CourseList;

