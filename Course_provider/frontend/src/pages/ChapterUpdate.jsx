import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ChapterForm from "../componenets/ChapterForm";


function ChapterUpdate(){

    const {id} = useParams();
    
    const navigate = useNavigate(); 

    const [title, setTitle] = useState("");

    const [order, setOrder] = useState("");

    const [video, setVideo] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        api
        .get(`courses/chapters/${id}/`)
        .then(
            (res)=>{
                setTitle(res.data.title);

                setOrder(res.data.order);

                setVideo(res.data.video);

                setLoading(false);

            }).catch((error)=>{
                console.log(error);

                setLoading(false);
            });
    },[id]);

    const handleSubmit =async (e) =>{

        e.preventDefault();

        const formData = new FormData();

        formData.append("title",title);

        formData.append("order",order);

        if (video instanceof File) {
            formData.append("video",video);
        }

        try{
            await api.put(`courses/chapters/update/${id}/`,formData);

            alert("Chapter successfully updated!!");

            navigate(-1);
        }catch (error){
            console.log(error);

            alert("Unable to update chapter.");
        }
    };

    if (loading){
        return(
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl font-bold text-orange-500">
                    Loading..
                </h2>

            </div>
        );
    }

    return(

        <ChapterForm
        
            title={title}

            setTitle={setTitle}

            order={order}

            setOrder={setOrder}

            video={video}

            setVideo={setVideo}

            onSubmit={handleSubmit}

            buttontext="Update Chapter"

        />
    );
}

export default ChapterUpdate;