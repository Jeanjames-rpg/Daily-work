import { Link } from "react-router-dom";
import styles from "../styles/CourseCard.module.css"

function CourseCard({ course }) {
    return(
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-200 hover:-translate-y-1">
            
            <img src={course.image} alt={course.title} className="w-full h-56 object-contain bg-white rounded-lg"/>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {course.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
                {course.description}
            </p>
            
            <div className="space-y-2 mb-6">
             <p className="text-sm text-gray-700">
                <span className="font-semibold">Mentor:</span> {course.mentor_name}
             </p>
             
             <p className="text-sm text-gray-700">
                <span className="font-semibold">Enrollments:</span> {course.student_count} 
             </p>
            </div>

            <Link to={`/courses/${course.id}`}>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium">View Details</button>
            </Link>
        </div>
    );
}

export default CourseCard;