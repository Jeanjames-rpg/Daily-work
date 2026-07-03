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

            setReviews();
        } catch (error) {

            console.log(error);

            alert("Unable to add review");
        }

    };

    return (
        <div>
            <h2>Student Reviews</h2>

       {enrolled&&(<form onSubmit={handleSubmit}>

                <select value={rating} onChange={(e)=>setRating(e.target.value)}>

                    <option value="">Rating</option>

                    <option value="5">5</option>

                    <option value="4">4</option>

                    <option value="3">3</option>

                    <option value="2">2</option>

                    <option value="1">1</option>

                </select>

                <textarea placeholder="Write Your Review.." value={review} onChange={(e)=>setReview(e.target.value)}/>

                <button type="submit">Submit</button>
                
            </form>

       ) } 
            <hr/>

            {

                reviews.map((item)=>(
                    <div key={item._id}>
                        
                        <h4>{item.studentName}</h4>

                        <p>⭐{item.rating}</p>

                        <p>{item.review}</p>

                        <small>
                            {
                                new Date(item.createdAt).toLocaleString()
                            }

                        </small>

                        <hr/>

                    </div>
                ))
            }

        </div>
    );
}

export default ReviewSection;