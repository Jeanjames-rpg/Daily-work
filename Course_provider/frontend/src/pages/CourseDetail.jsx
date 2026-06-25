import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";
import styles from "../styles/CourseDetail.module.css";

function CourseDetail() {

    const {id} = useParams();

    const [course, setCourse] = useState(null);

    const [enrolled, setEnrolled] = useState(false);

    useEffect(()=> {

        api
        .get(`courses/${id}/`)
        .then((res)=> {

            setCourse(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

        api
        .get(`courses/${id}/enrollment-status/`)
        .then((res)=>{
            setEnrolled(res.data.enrolled);
        })
        .catch((error)=> {
            console.log(error);
        });


    },[id]);

    console.log(course)

    if (!course) {
        return <h2>Loading...</h2>;
    }

    const enroll = async()=> {
        try{
            await api.post("courses/enroll/",
                {
                    course: course.id
                }
            );

            alert("Enrollment Successful");
        }
        catch(error){
            console.log(error.response.data);
        }
    };


    return (
    <div className={styles.container}>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>

        <p className={styles.mentor}>
            Mentor: {course.mentor_name}
        </p>

        <h2 className={styles.chaptersTitle}>Chapters</h2>

        {course.chapters?.map((chapter,index) => (
           <div className={styles.chapterCard} style={{ animationDelay: `${index * 0.1}s`}}>     
            
            <h3 className={styles.chapterTitle}>

                {chapter.order}.

                {chapter.title}

            </h3>

            {/* <video 
            width="600"
            controls
            >
                <source src={chapter.video} type="video/mp4"/>

                Your browser does not support video.

            </video> */}

            {enrolled ? (
                <video>
                    <source src={chapter.video} type="video/mp4"/>

                    Your Browser Does Not Support Video

                </video>
            ) : (
                <div className={styles.locked}>
                    🔒 This Video is locked. Please enroll to watch.
                </div>   
            )
            
            }

          </div>
        ))}

        {/* <CourseCard key={course.id} course={course} /> */}

        {/* <button className={styles.enrollbtn} onClick={enroll}>Enroll</button> */}

        {!enrolled ?(
            <button className={styles.enrollbtn} onClick={enroll}>
                Enroll
            </button>
        ):(
            <p>"Enrolled!"</p>
        ) }            

    </div>

);
}
export default CourseDetail;