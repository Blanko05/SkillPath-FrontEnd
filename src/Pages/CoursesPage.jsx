import {useState, useEffect} from 'react';
import { mockCourses, mockFetch } from '../../mockData.js';
import CourseCard from '../Components/CourseCard.jsx';
function CoursesPage() {

    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        mockFetch(mockCourses).then((data)=>{
            setCourses(data);
        });
    },[]);

    return (
        <>
            <h1>Courses</h1>
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </>
    );
}

export default CoursesPage;
