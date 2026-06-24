import { Link } from "react-router-dom";
import styles from "../styles/CourseCard.module.css"

function CourseCard({ course }) {
    return(
        <div className={styles.card}>
            <h2 className={styles.title}>{course.title}</h2>
            <p className={styles.description}>{course.description}</p>
            <p className={styles.mentor}>Mentor: {course.mentor_name}</p>
            <p className={styles.count}>Enrollments: {course.student_count} </p>

            <Link to={`/courses/${course.id}`}>
                <button className={styles.button}>View Details</button>
            </Link>
        </div>
    );
}

export default CourseCard;