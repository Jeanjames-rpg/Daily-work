import { Link } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import Main from "../componenets/Main";


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
         
        <Header/>

        <Main>
        <div>
            <h1>My courses</h1>

            {courses.map((course)=>(
                <div key={course.id}>
                    <h2>{course.title}</h2>

                    <p>{course.description}</p>

                    <p>Mentor:{course.mentor_name}</p>

                </div>
            ))}

            <diV>
                <Link to='/'>Return to home?</Link>
            </diV>

        </div>
        </Main>
        
        <Footer/>
        </div>


    );
}
export default Mycourses;