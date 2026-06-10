import api from "../services/api";
import { useState } from "react";


function Createcourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const response = await api.post(
                "courses/create/",
                {
                    title,
                    description
                }
            );

            console.log(response.data);

            alert("Course successfully created");
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Create Course</h1>

            <form onSubmit={handleSubmit}>

                <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <textarea placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)}/>

                <button type="submit">Create Course</button>
                
            </form>
        </div>
    );
}

export default Createcourse;