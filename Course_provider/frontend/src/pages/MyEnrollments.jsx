import { useState, useEffect } from "react";

import api from "../services/api";
import { Link } from "react-router-dom";

function MyEnrollments() {

    const [enrollments, setEnrollments] = useState([]);


    useEffect(()=> {
        api
        .get("courses/my-enrollments/")
        .then((res) =>{
            setEnrollments(res.data);
        })
        .catch((err)=>{
            console.log(err);
        });

    },[]);
    console.log(enrollments); 
    return (
        <div>
            <h1>
                My Courses
            </h1>

            {
                enrollments.map(
                    (item)=> (
                        <div
                          key={item.id}  
                        >
                            <h2>{item.course_title}</h2>
                            
                            <Link to={`/courses/${item.course}`}>continue learning</Link>
                        </div>
                    )
                )
            }

        </div>
    );

}

export default MyEnrollments;