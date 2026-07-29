import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import CourseForm from "../componenets/CourseForm";

function CourseUpdate() {
    const {id} = useParams();

    const navigate =useNavigate();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(true);

    const [price, setPrice] = useState("");

    useEffect(()=>{
        api.get(`courses/${id}/`)
            .then((res)=>{
                
                setTitle(res.data.title);

                setDescription(res.data.description);

                setPrice(res.data.price)

                setImage(res.data.image);

                setLoading(false);
            })
            .catch((err) => {

                console.log(err);

                setLoading(false);

            });

    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title",title);

        formData.append("description",description);

        formData.append("price",price)

        if (image instanceof File) {
            formData.append("image",image);
        }

        try{

            await api.put(
                `courses/update/${id}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Course Updated Successfully!");

            navigate("/my-courses");

        } catch (error) {
            console.log(error);
            console.log(error.response);
            console.log(error.response?.status);
            console.log(error.response?.data);

            alert("Unable to update course.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-orange-500">
                    Loading...
                </p>
            </div>
        );
    }

    return (

        <div className="min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <CourseForm
                 title={title}

                 setTitle={setTitle}

                 description={description}

                 setDescription={setDescription}

                 price={price}

                 setPrice={setPrice}

                 image={image}

                 setImage={setImage}

                 onSubmit={handleSubmit}

                 buttonText="Update Courses"
                />
            </div>
        </div>

    );
}

export default CourseUpdate;
