import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function AddChapter() {
    const {id} = useParams();

    const[title, setTitle] = useState("");

    const[order, setOrder] = useState("");

    const[video, setVideo] = useState(null);

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const formData = new FormData();

        formData.append("course", id);

        formData.append("title", title);

        formData.append("order", order);

        formData.append("video", video);

        try {
            await api.post(
                "courses/chapters/create/",
                formData
            );

            alert("Chapter Added");

        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Add Chapter</h1>

            <form onSubmit={handleSubmit}>

                <input type="text" placeholder="Chapter title" onChange={(e)=> setTitle(e.target.value)} />

                <input type="number" placeholder="oder"  onChange={(e)=> setOrder(e.target.value)} />

                <input type="file" accept="video/*" onChange={(e)=> setVideo(e.target.files[0])} />

                <button type="submit">Add Chapter</button>

            </form>


        </div>
    );
}

export default AddChapter;