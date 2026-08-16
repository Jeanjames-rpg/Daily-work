import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../componenets/CourseCard";
import styles from "../styles/CourseDetail.module.css";
import reviewApi from "../services/reviewApi";
import ReviewSection from "../componenets/ReviewSection";
import { createOrder } from "../services/paymentApi";
import ScrollReveal from "../componenets/ScrollReveal";


function CourseDetail() {

    const {id} = useParams();

    const [course, setCourse] = useState(null);

    const [enrolled, setEnrolled] = useState(false);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    // const user = JSON.parse(localStorage.getItem("user"));
 

    const isOwner =
                    //  user && 
                     user?.role === 'mentor' && 
                     user?.id === course?.mentor_id;
   

    useEffect(()=> {

        api
        .get(`courses/${id}/`)
        .then((res)=> {

            setCourse(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

        api
        .get(`courses/${id}/enrollment-status/`)
        .then((res)=>{
            setEnrolled(res.data.enrolled);
        })
        .catch((error)=> {
            console.log(error);
        });


    },[id]);

    useEffect(() => {

        api.get("me/")
        .then((res)=>{
            setUser(res.data);
        })
        .catch(() => {
            setUser(null);
        });

    },[]);

    console.log(course)
    console.log(user)

    if (!course ) {
        return (
            <div className="min-h-screen items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Loading course...
                </h2>
            </div>
        )
    }

    const enroll = async()=> {
        try{
            await api.post("courses/enroll/",
                {
                    course: course.id
                }
            );

            alert("Enrollment Successful");
            setEnrolled(true);
        }
        catch(error){
            if (error.response?.status === 401){
                alert("Please Register or Login first.");
                navigate("/register");
            } else {
                console.log(error.response?.data);
            }

            // console.log(error.response.data);
        }
    };
    
    const deleteCourse = async ()=> {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `courses/delete/${course.id}`
            );

            alert('Course deleted successfully.');

            navigate("/my-courses");
        }
        catch (error){
            console.log(error);

            alert("Unable to delete course.");
        }
    };

    const deleteChapter = async (chapterId) => {

        const confirmDelete = window.confirm(
            "Want to delete this chapter?"
        );

        if (!confirmDelete) return;

        console.log("Dleteing chapter:",chapterId)

        try {
            await api.delete(`courses/chapters/delete/${chapterId}/`);

            alert ("Chapter deleted!!");

            setCourse({
                ...course,
                chapters: course.chapters.filter(
                    (chapter) => chapter.id !== chapterId
                )
            });

            // navigate("/my-courses");

        }
        catch (error){
            console.error("Delete failed:",error);

            alert( "Unable to delete chapter!");
        }

    };



    const handlePayment = async () => {
        try {
            const order = await createOrder(course.id);

            const options = {

                key: order.key,

                amount: order.amount,

                currency: order.currency,
                
                name: "Hive",

                description: order.description,

                order_id: order.order_id,

                handler: async function (response) {
                    
                    console.log(response);

                    // alert("Payment successfull");

                    await api.post("payments/verify/",{
                        razorpay_payment_id : response.razorpay_payment_id,
                        razorpay_order_id : response.razorpay_order_id,
                        razorpay_signature : response.razorpay_signature,
                    });

                    alert("Payment Successfull")

                    setEnrolled(true);
                },

                theme: {
                    color: "#f97316"
                }
            };
            

            const razorpay = new window.Razorpay(options);

            razorpay.open();
        } catch (error) {
            console.log(error);
        }
    };

    return (

        // <div className="min-h-screen bg-gray-50 py-10">

        //     <div className="max-w-6xl mx-auto px-5">

        //         <div className="relative h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">

        //             <img
        //                 src={course.image}
        //                 alt={course.title}
        //                 className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        //             />

        //             <div
        //                 className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        //             />

        //             <div className="absolute bottom-8 left-8 text-white">

        //                 <h1 className="text-4xl md:text-6xl font-bold">
        //                     {course.title}
        //                 </h1>

        //                 <p className="mt-3 text-lg">
        //                     Created by {course.mentor_name}
        //                 </p>


        //             </div>

        //         </div>


        //         <div className="mt-8 bg-white rounded-2xl shadow p-8">

        //             <h2 className="text-2xl font-bold mb-4">
        //                 About this course
        //             </h2>

        //             <p className="text-gray-700 leading-relaxed">
        //                 {course.description}
        //             </p>



        //         </div>


                

        //         <div className="mt-10">

        //             <h2 className="text-3xl font-bold mb-6">
        //                 Chapters
        //             </h2>

        //             <div className="space-y-6">

        //                 {course.chapters?.map((chapter)=>(

        //                     <div
        //                         key={chapter.id}
        //                         className="bg-white rounded-2xl shadow p-6"
        //                     >

        //                         <h3 
        //                          className="text-xl font-semibold mb-5"
        //                         >
        //                             {chapter.order}.{chapter.title}
        //                         </h3>

        //                         {
        //                             enrolled || isOwner ? (
        //                                 <video controls className="w-full rounded-xl">

        //                                     <source
        //                                         src={chapter.video}
        //                                         type="video/mp4"
        //                                     />

        //                                 </video>
        //                             ) : (
        //                                 <div 
        //                                     className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500"
        //                                 >
        //                                     🔒 Enroll to watch
        //                                 </div>   
        //                             )
        //                         }

        //                     </div>   
        //                 ))}

        //             </div>

        //         </div>


        //         <div className="mt-10">

        //             {!isOwner && (
        //                 enrolled ? (
        //                     <span className="px-6 py-3 rounded-xl bg-green-100 text-green-700 font-semibold">
        //                        ✅ Enrolled 
        //                     </span>

        //                 ) : (
                            
        //                     <button 
        //                         onClick={enroll}
        //                         className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        //                     >
        //                         Enroll Now
        //                     </button>
        //                 )
        //             )}


        //         </div>


        //         <div className="mt-12">

        //             <ReviewSection
        //                 courseId={id}
        //                 enrolled={enrolled}
        //             />

        //         </div>



        //     </div>

        // </div>
         <div className="
            min-h-screen
            bg-gray-50
            py-10
        ">


            <div className="
                max-w-6xl
                mx-auto
                px-5
            ">





                {/* HERO SECTION */}

               <ScrollReveal>
                <div className="
                    relative
                    h-[350px]
                    md:h-[500px]
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                ">


                    <img

                        src={course.image}

                        alt={course.title}

                        className="
                            w-full
                            h-full
                            object-cover
                            transition
                            duration-500
                            hover:scale-105
                        "

                    />



                    <div className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/30
                        to-transparent
                    " />




                    <div className="
                        absolute
                        bottom-8
                        left-8
                        right-8
                        text-white
                    ">


                        <h1 className="
                            text-4xl
                            md:text-6xl
                            font-bold
                            drop-shadow-xl
                        ">

                            {course.title}

                        </h1>



                        <p className="
                            mt-4
                            text-lg
                            text-gray-200
                        ">

                            Created by {course.mentor_name}

                        </p>



                    </div>


                </div>
               </ScrollReveal>  








                {/* DESCRIPTION */}


              <ScrollReveal>  
                <div className="
                    mt-8
                    bg-white
                    rounded-2xl
                    shadow
                    p-8
                ">


                    <h2 className="
                        text-2xl
                        font-bold
                        mb-4
                    ">

                        About this course

                    </h2>



                    <p className="
                        text-gray-700
                        leading-relaxed
                    ">

                        {course.description}

                    </p>


                </div>
              </ScrollReveal> 








                {/* CHAPTERS */}



                <div className="mt-10">


                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">

                        Course Chapters

                    </h2>





                    <div className="
                        space-y-6
                    ">


                    {
                        course.chapters?.map((chapter)=>(

                          <ScrollReveal>
                            <div

                                key={chapter.id}

                                className="
                                    bg-white
                                    rounded-2xl
                                    shadow
                                    p-6
                                    hover:shadow-xl
                                    transition
                                "

                            >




                                <h3 className="
                                    text-xl
                                    font-bold
                                    mb-5
                                ">

                                    {chapter.order}. {chapter.title}

                                </h3>

                               <p className="text-gray-600 leading-relaxed mb-5">
                                {chapter.description}
                               </p>







                                {
                                    isOwner && (

                                    <div className="
                                        flex
                                        gap-3
                                        mb-5
                                    ">


                                        <Link

                                            to={`/courses/chapter/update/${chapter.id}`}

                                            className="
                                                px-4
                                                py-2
                                                rounded-lg
                                                bg-indigo-600
                                                text-white
                                                hover:bg-indigo-700
                                            "

                                        >

                                            ✏️ Update

                                        </Link>





                                        <button

                                            onClick={()=>
                                                deleteChapter(chapter.id)
                                            }

                                            className="
                                                px-4
                                                py-2
                                                rounded-lg
                                                bg-red-600
                                                text-white
                                                hover:bg-red-700
                                            "

                                        >

                                            🗑 Delete

                                        </button>



                                    </div>

                                    )
                                }









                                {
                                    enrolled || isOwner

                                    ?

                                    (

                                    <video

                                        controls

                                        className="
                                            w-full
                                            aspect-video
                                            rounded-xl
                                            bg-black
                                            shadow
                                        "

                                    >

                                        <source

                                            src={chapter.video}

                                            type="video/mp4"

                                        />

                                    </video>

                                    )

                                    :

                                    (

                                    <div className="
                                        h-40
                                        rounded-xl
                                        bg-gray-100
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-500
                                        text-lg
                                    ">

                                        🔒 Enroll to watch this chapter

                                    </div>

                                    )

                                }




                            </div>
                          </ScrollReveal>            

                        ))
                    }


                    </div>


                </div>









                {/* ACTION BUTTONS */}



                <div className="
                    mt-10
                    flex
                    gap-4
                    flex-wrap
                ">




                {
                    !isOwner && (

                        enrolled

                        ?

                        (

                        <span className="
                            px-6
                            py-3
                            rounded-xl
                            bg-green-100
                            text-green-700
                            font-semibold
                        ">

                            ✅ Enrolled

                        </span>

                        )


                        :

                        (

                        <button

                            // onClick={enroll}

                            onClick={handlePayment}

                            className="
                                px-8
                                py-3
                                rounded-xl
                                bg-indigo-600
                                text-white
                                font-semibold
                                hover:bg-indigo-700
                            "

                        >

                            Buy Now

                        </button>

                        )

                    )
                }








                {
                    isOwner && (

                    <button

                        onClick={deleteCourse}

                        className="
                            px-8
                            py-3
                            rounded-xl
                            bg-red-600
                            text-white
                            font-semibold
                            hover:bg-red-700
                        "

                    >

                        🗑 Delete Course

                    </button>

                    )
                }



                </div>









                {/* REVIEWS */}


                <div className="mt-12">
                 <ScrollReveal>

                    <ReviewSection

                        courseId={id}

                        enrolled={enrolled}

                    />
                 </ScrollReveal>

                </div>






            </div>


        </div>
        
    );
} 
    export default CourseDetail;