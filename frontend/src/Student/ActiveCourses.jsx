import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import CourseFeedbackForm from './CourseFeedbackForm';

const ActiveCourses = () => {
    const { userType, semester } = useContext(UserContext);
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [feedbackCode, setFeedbackCode] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [redirectToFeedback, setRedirectToFeedback] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`api/student/active-course-list/${semester}`);
                const activeCourses = response.data.map(course => ({ ...course, active: false }));
                setCourses(activeCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [semester]);

    const openModal = (course) => {
        setSelectedCourse(course);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleFeedbackCodeChange = (event) => {
        setFeedbackCode(event.target.value);
    };

    const validateFeedbackCode = async () => {
        try {
            const response = await axios.post('/api/student/verify-feedback-code', {
                courseId: selectedCourse._id,
                feedbackCode: feedbackCode
            });
            if (response.data.valid) {
                setRedirectToFeedback(true);
                setShowModal(false) // Set flag to indicate redirection to feedback form
            } else {
                setFeedbackMessage('Invalid feedback code');
            }
        } catch (error) {
            console.error('Error verifying feedback code:', error);
            setFeedbackMessage('Error verifying feedback code');
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
                        {userType === 'student' && (
                            <div className="mt-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => openModal(course)}
                                >
                                    Give Feedback
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {showModal && selectedCourse && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Feedback for {selectedCourse.courseName}</h2>
                        <input
                            type="text"
                            placeholder="Enter feedback code"
                            className="border rounded-md px-4 py-2 mb-4"
                            value={feedbackCode}
                            onChange={handleFeedbackCodeChange}
                        />
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={validateFeedbackCode}
                            >
                                Submit
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                        <div>{feedbackMessage}</div>
                    </div>
                </div>
            )}
            {redirectToFeedback && <CourseFeedbackForm selectedCourse={selectedCourse} setRedirectToFeedback={setRedirectToFeedback}/>}
        </div>
    );
};

export default ActiveCourses;
