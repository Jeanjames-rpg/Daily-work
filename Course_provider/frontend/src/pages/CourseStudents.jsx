import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";


function CourseStudents (){

    const {id} = useParams();

    const[students ,setStudents] = useState([]);

    useEffect(()=>{

        api
        .get(`/courses/${id}/students/`)
        .then((res)=>{
            setStudents(res.data);
        })
        .catch((error) => {
            console.log(error);
        });

    },[id]);


    return(
        <div>
            <h1>Enrolled Students</h1>

            {students.map((student)=>(

                <div key={student.id}>
                    <h3>{student.student_name}</h3>

                </div>


            ))}


        </div>

    );

}

export default CourseStudents;