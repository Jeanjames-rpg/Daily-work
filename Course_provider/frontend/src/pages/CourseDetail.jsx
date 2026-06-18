import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";
import styles from "../styles/CourseDetail.module.css";

function CourseDetail() {

    const {id} = useParams();

    const [course, setCourse] = useState(null);

    useEffect(()=> {

        api
        .get(`courses/${id}/`)
        .then((res)=> {

            setCourse(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    },[id]);

    console.log(course)

    if (!course) {
        return <h2>Loading...</h2>;
    }


    return (
    <div className={styles.container}>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>

        <p className={styles.mentor}>
            Mentor: {course.mentor_name}
        </p>

        <h2 className={styles.chaptersTitle}>Chapters</h2>

        {course.chapters?.map((chapter) => (
           <div className={styles.chapterCard}>     
            
            <h3 className={styles.chapterTitle}>

                {chapter.order}.

                {chapter.title}

            </h3>

          </div>
        ))}

        {/* <CourseCard key={course.id} course={course} /> */}

        <button className={styles.enrollbtn}>Enroll</button>
    </div>

);
}
export default CourseDetail;