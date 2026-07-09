import { Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import styles from "../styles/Coursecreation.module.css"

function Createcourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault();

        //Formdata
        const formData =  new FormData();

        formData.append("title",title);
        formData.append("description",description);
        if (image){
            formData.append("image",image);
        }


        try {
            const response = await api.post(
                "courses/create/",formData,
                 {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
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
        <div className={styles.container}>
        

        <div className={styles.card}>
            <h1 className={styles.title}>Create Course</h1>

            <form onSubmit={handleSubmit} className={styles.form}>

                <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>

                <input className={styles.input} type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <textarea className={styles.textarea} placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)}/>

                <button type="submit" className={styles.button}>Create Course</button>
                
            </form>

            <Link to="/" className={styles.link}>Home page</Link>
        </div>
        
        

        </div>
    );
}

export default Createcourse;