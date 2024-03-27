import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const CourseList = () => {
    const { userType, id } = useContext(UserContext);
    const [courses, setCourses] = useState([]);
    const [courseFeedbackCodes, setCourseFeedbackCodes] = useState({});

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`api/faculty/course-list/${id}`);
                // Add an 'active' property to each course
                const coursesList = response.data.map(course => ({ ...course, active: false }));
                setCourses(coursesList);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [id]);

    const generateFeedbackCode = () => {
        return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit code and convert it to a string
    };

    const activateCourse = async (courseId) => {
        try {
            const code = generateFeedbackCode();
            // Update the course's active state and feedback code in the backend
            await axios.put(`/api/faculty/course/${courseId}/activate`, { courseFeedbackCode: code });

            // Update the local state to reflect the change
            setCourses(prevCourses =>
                prevCourses.map(course =>
                    course._id === courseId ? { ...course, active: true } : course
                )
            );

            // Update the feedback code state
            setCourseFeedbackCodes(prevFeedbackCodes => ({
                ...prevFeedbackCodes,
                [courseId]: code
            }));
        } catch (error) {
            console.error('Error activating course:', error);
        }
    };

    const deactivateCourse = async (courseId) => {
        try {
            // Delete the course from the database
            await axios.put(`/api/faculty/course/${courseId}/deactivate`);

            // Update the local state to reflect the change
            setCourses(prevCourses =>
                prevCourses.map(course =>
                    course._id === courseId ? { ...course, active: false } : course
                )
            );

            // Remove the feedback code from the state
            setCourseFeedbackCodes(prevFeedbackCodes => {
                const updatedCodes = { ...prevFeedbackCodes };
                delete updatedCodes[courseId];
                return updatedCodes;
            });
        } catch (error) {
            console.error('Error deactivating course:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {courses.map(course => (
                <div key={course._id}>
                    <div className="bg-white p-4 shadow-md rounded-md w-full md:w-auto lg:w-auto xl:w-auto">
                        <p className="text-lg font-semibold mb-2">{course.courseName}</p>
                        <p className="text-gray-600 mb-2">Course Code: {course.courseCode}</p>
                        <p className="text-gray-600 mb-2">Semester: {course.semester}</p>
                        <p className="text-gray-600 mb-2">Course Class: {course.courseClass}</p>
                        {userType === 'faculty' && (
                            <div className="mt-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => activateCourse(course._id)}
                                >
                                    Activate
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => deactivateCourse(course._id)}
                                >
                                    Deactivate
                                </button>
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                {courseFeedbackCodes[course._id] && <div>Feedback Code: {courseFeedbackCodes[course._id]}</div>}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseList;
