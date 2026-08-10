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


    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN",{
            day:"2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return(
        // <div>
        //     <h1>Enrolled Students</h1>

        //     {students.map((student)=>(

        //         <div key={student.id}>
        //             <h3>{student.student_name}</h3>
        //             <h3>{student.enrolled_at}</h3>

        //         </div>


        //     ))}


        // </div>

        <div className="min-h-screen bg-gray-100 px-4 py-10">

            <div className="max-w-5xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Enrolled Students
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Students currrently enrolled in this course 
                    </p>
                    
                </div>

                <div className="mb-6">

                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                        {students.length} Students
                    </span>

                </div>

                {students.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-10 text-center">
                        <h2>
                            No students enrolled yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Students who enroll in this course will appear here.
                        </p>
                    </div>
                ):(
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
                            >
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {student.student_name
                                            ?.charAt(0)
                                            .toUpperCase()
                                           }
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">
                                            {student.student_name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                           Student
                                        </p>   
                                    </div>


                                    <div className="border-t pt-4">
                                        <p className="text-sm text-gray-500">
                                            Enrolled on 
                                        </p>

                                        <p className="text-gray-700 font-semibold mt-1">
                                            {formatDate(student.enrolled_at)}
                                        </p>
                                    </div>         

                                </div>

                            </div>
                        ))}
                    
                    </div>
                )}

            </div>


        </div>

    );

}

export default CourseStudents;