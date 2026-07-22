import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";
import styles from "../styles/CourseDetail.module.css";
import reviewApi from "../services/reviewApi";
import ReviewSection from "../componenets/ReviewSection";


function CourseDetail() {

    const {id} = useParams();

    const [course, setCourse] = useState(null);

    const [enrolled, setEnrolled] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    // const user = JSON.parse(localStorage.getItem("user"));
 

    const isOwner =
                    //  user && 
                     user?.role === 'mentor' && 
                     user?.id === course?.mentor_id;
   

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

    useEffect(() => {

        api.get("me/")
        .then((res)=>{
            setUser(res.data);
        })
        .catch(() => {
            setUser(null);
        });

    },[]);

    console.log(course)
    console.log(user)

    if (!course ) {
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
            setEnrolled(true);
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
    
    const deleteCourse = async ()=> {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `courses/delete/${course.id}`
            );

            alert('Course deleted successfully.');

            navigate("/my-courses");
        }
        catch (error){
            console.log(error);

            alert("Unable to delete course.");
        }
    };

    const deleteChapter = async (chapterId) => {

        const confirmDelete = window.confirm(
            "Want to delete this chapter?"
        );

        if (!confirmDelete) return;

        console.log("Dleteing chapter:",chapterId)

        try {
            await api.delete(`courses/chapters/delete/${chapterId}/`);

            alert ("Chapter deleted!!");

            setCourse({
                ...course,
                chapters: course.chapters.filter(
                    (chapter) => chapter.id !== chapterId
                )
            });

            // navigate("/my-courses");

        }
        catch (error){
            console.error("Delete failed:",error);

            alert( "Unable to delete chapter!");
        }

    };


    return (
    <div className={styles.container}>
        <div className="w-full h-56 overflow-hidden rounded-xl bg-gray-100">
    <img
        src={course.image}
        alt={course.title}
        className="w-full h-[450px] object-contain transition-transform duration-300 hover:scale-105"
    />
    </div>
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

            

            {user?.role === 'mentor' &&
             user?.id === course.mentor_id &&(
                <Link to={`/courses/chapter/update/${chapter.id}`}
                 className="inline-block mt-3 px-5 py-2 rounded-lg mb-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transition-all duration-300"
                >
                    ✏️ Update Chapter
                </Link>
             )
            }

            {isOwner && <button onClick={() => deleteChapter(chapter.id)} className=" ml-px px-4 py-2 rounded-lg bg-gradient-to-l from-rose-400 to-red-600 hover:from-rose-500 hover:to-red-700 transition text-white">🗑️ Delete chapter</button>}

            {enrolled || isOwner ? (
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

        {isOwner&&(
            <button onClick={deleteCourse}
                className="ml-px px-4 py-2 rounded-lg bg-gradient-to-l from-rose-400 to-red-600 hover:from-rose-500 hover:to-red-700 transition text-white"
            >
               🗑️ Delete Course
            </button>
        )}

        <hr/>

       {/* Reviews */}

        <ReviewSection courseId={id} enrolled={enrolled}/>
    </div>

);
}
export default CourseDetail;