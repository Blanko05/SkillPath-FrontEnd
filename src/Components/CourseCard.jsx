function CourseCard({ course }) {

    return (
        <div className="course-card">
            <div className="course-card-content">
                <h2>{course.title}</h2>
                <p>Category: {course.category}</p>
            </div>
        </div>

    );
}

export default CourseCard;