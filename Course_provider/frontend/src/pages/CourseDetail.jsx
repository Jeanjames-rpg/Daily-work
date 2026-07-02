import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";
import styles from "../styles/CourseDetail.module.css";
import reviewApi from "../services/reviewApi";


function CourseDetail() {

    const {id} = useParams();

    const [course, setCourse] = useState(null);

    const [enrolled, setEnrolled] = useState(false);

    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);

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

        reviewApi
        .get(`reviews/course/${id}`)

        .then((res)=>{
            setReviews(res.data);
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
            if (error.response?.status === 401){
                alert("Please Register or Login first.");
                navigate("/register");
            } else {
                console.log(error.response?.data);
            }

            // console.log(error.response.data);
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
                <video 
                width="600"
                controls
                >
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


        <h2>Reviews </h2>

        {reviews.map((review)=>(
            <div key={review._id}>

                <h4>{review.studentName}</h4>

                <p>⭐ {review.review}</p>

            </div>  
        ))}

    </div>

);
}
export default CourseDetail;