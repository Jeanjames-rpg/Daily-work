import CourseList from "./Courselist";
import styles from "../styles/Homepage.module.css"
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";


function Home(){

    const[courses, setCourses] = useState([]);

    useEffect(()=>{
        api
        .get('courses/')
        .then((res)=>{
            setCourses(res.data);
        })
        .catch((err)=>{console.log(err)});
    },[]);


    const trendingCourses = [...courses]

    .sort((a,b) => 
        b.student_count - a.student_count
    )
    .slice(0,3);

    return (
        
    <div className={styles.container}>
        <section className={styles.hero}>
            
        
            
                <h1 className={styles.title}>Welcome to course provider</h1>

                <p className={styles.subtitle}>Learn from experts</p>


                
        </section>    
                <h2 className={styles.sectiontitle}>OUR COURSES</h2>

                <div className={styles.grid}>
                    {courses.map((course)=>(
                        <CourseCard course={course} key={course.id}/>
                    ))}

                </div>

            
                <h3 className={styles.sectiontitle}>Trending Courses</h3>
        
                    <div className={styles.grid2}>
                        {trendingCourses.map((course)=>(
                            <CourseCard course={course} key={course.id} />
                        ))}
                    </div>

    </div>
    );
}

export default Home;