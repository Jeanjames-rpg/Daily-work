import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";

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
    <div>
        {/* <h1>{course.title}</h1>
        <p>{course.description}</p>

        <p>
            Mentor: {course.mentor_name}
        </p> */}

        <CourseCard key={course.id} course={course} />

        <button>Enroll</button>
    </div>

);
}
export default CourseDetail;