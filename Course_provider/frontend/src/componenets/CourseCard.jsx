
function CourseCard({ course }) {
    return(
        <div className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Mentor: {course.mentor_name}</p>
        </div>
    );
}

export default CourseCard;