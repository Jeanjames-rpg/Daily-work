import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CourseCard({ course }) {
    return(
        <motion.div 
            // initial={{opacity: 0, y: 40,}}
            // whileInView={{opacity: 1, y: 0,}}
            // viewport={{once: true, amount: 0.2,}}
            transition={{duration: 0.6, ease: "easeOut",}}
            whileHover={{y: -8, scale: 1.02,}}

            className="h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl p-6 border border-gray-200 "
        >
            
            <img src={course.image} alt={course.title} className="w-full h-56 object-contain bg-white rounded-lg"/>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {course.title}
            </h2>
            <p className="text-gray-600 mt-2 h-[72px] line-clamp-3 overflow-hidden">
                {course.description}
            </p>
            
            <div className="space-y-2 mb-6">
             <p className="text-sm text-gray-700">
                <span className="font-semibold">Mentor:</span> {course.mentor_name}
             </p>
             
             <p className="text-sm text-gray-700">
                <span className="font-semibold">Enrollments:</span> {course.student_count} 
             </p>

             <p className="text-2xl font-bold text-green-600 mt-3">
                ₹{course.price}
             </p>
            </div>

            <Link to={`/courses/${course.id}`}>
                <motion.button 
                  whileHover={{
                    scale: 1.02,
                  }}

                  whileTap={{
                    scale: 0.97,
                  }}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-medium"
                >
                    View Details
                </motion.button>
            </Link>
        </motion.div>
    );
}

export default CourseCard;