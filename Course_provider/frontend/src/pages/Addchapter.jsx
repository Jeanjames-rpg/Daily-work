import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/Addchapter.module.css"
import ChapterForm from "../componenets/ChapterForm";


function AddChapter() {
    const {id} = useParams();

    const navigate = useNavigate();

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
                formData,
            );

            alert("Chapter Added");

            navigate(`/courses/${id}`)

        }
        catch(error){
            console.log(error);
        }
    };

    return (
        // <div className={styles.container}>

        // <div className={styles.card}>
        //     <h1 className={styles.title}>Add Chapter</h1>

        //     <form onSubmit={handleSubmit}  className={styles.form}>

        //         <input className={styles.input} type="text" placeholder="Chapter title" onChange={(e)=> setTitle(e.target.value)} />

        //         <input className={styles.input} type="number" placeholder="oder"  onChange={(e)=> setOrder(e.target.value)} />

        //         <input className={styles.file} type="file" accept="video/*" onChange={(e)=> setVideo(e.target.files[0])} />

        //         <button className={styles.button} type="submit">Add Chapter</button>

        //     </form>


        // </div>

        // </div>
        <ChapterForm
            title={title}
            setTitle={setTitle}
            order={order}
            setOrder={setOrder}
            video={video}
            setVideo={setVideo}
            buttontext="Add Chapter"
            onSubmit={handleSubmit}
        />
    );
}

export default AddChapter;