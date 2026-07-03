import { useEffect,useState } from "react";
import reviewApi from "../services/reviewApi";

function ReviewSection({ courseId ,enrolled}) {
    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState("");

    const [review, setReview] = useState("");

    const loadReviews = async () => {

        try {
            const res = await reviewApi.get(
                `reviews/course/${courseId}`
            );

            setReviews(res.data);

        } catch (error) {
            console.log(error);
        }

    };

    useEffect(()=> {

        loadReviews();

    },[courseId]);

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try{
            await reviewApi
            .post("reviews",
                {
                    courseId,
                    rating,
                    review
                }
            );

            alert ("Review Added");

            setRating("");

            setReview("");

            await loadReviews();

        } catch (error) {

            console.log(error);

            alert("Unable to add review");
        }

    };

    return (
        <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Student Reviews
            </h2>

       {enrolled&&(<form onSubmit={handleSubmit} className="space-y-4 mb-6">

                <select value={rating} onChange={(e)=>setRating(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-indigo-500">

                    <option value="">Rating</option>

                    <option value="5">⭐⭐⭐⭐⭐(5)</option>

                    <option value="4">⭐⭐⭐⭐(4)</option>

                    <option value="3">⭐⭐⭐(3)</option>

                    <option value="2">⭐⭐(2)</option>

                    <option value="1">⭐(1)</option>

                </select>

                <textarea placeholder="Write Your Review.." value={review} onChange={(e)=>setReview(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"/>

                <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                    Submit
                </button>
                
            </form>

       ) } 
            
            <div>

                {reviews.length === 0 ?(
                    <p className="text-gray-500 text-center">
                        No reviews yet
                    </p>
                ):(
                reviews.map((item)=>(
                    <div key={item._id} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
                        
                      <div className="flex justify-between items-center mb-2">  
                        <h4 className="text-lg font-semibold text-gray-800">
                            {item.studentName}
                        </h4>

                        <span className="text-yellow-500 font-semibold">
                            ⭐ {item.rating}/5
                        </span>
                      
                      </div>
                      
                        <p className="text-gray-700 mb-3">{item.review}</p>

                        <small className="text-gray-500">
                            {
                                new Date(item.createdAt).toLocaleString()
                            }

                        </small>

                        

                    </div>
                ))
            )}
            </div>

        </div>
    );
}

export default ReviewSection;