import { useState, useContext } from 'react';
import axios from 'axios';
import courseRatingQuestions from "./CourseRatingQuestions"
import { UserContext } from '../UserContext';
const CourseFeedbackForm = ({ selectedCourse, setRedirectToFeedback }) => {
    const {id} = useContext(UserContext);

    const [ratings, setRatings] = useState(Array(courseRatingQuestions.length).fill(0));
    const [comment, setComment] = useState("");
    // Function to handle form submission


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('rated course ', ratings, id, selectedCourse._id, comment);
    
        try {
            // Send a POST request to the backend to store the ratings
            const response = await axios.post('/api/student/store-course-ratings', {
                courseId: selectedCourse._id,
                studentId: id,
                ratings: ratings,
                comment: comment
            });
            console.log('Ratings stored successfully:', response.data);
        } catch (error) {
            console.error('Error storing ratings:', error);
        }
        setRedirectToFeedback(false)
    };
    
    const handleRatingChange = (index, rating) => {
        const updatedRatings = [...ratings];
        updatedRatings[index] = rating;
        setRatings(updatedRatings);
    };

    return (
        <div className="w-[33vw] mx-auto p-4 bg-white shadow-md rounded-md h-[65vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Feedback for {selectedCourse.courseName}</h2>
            <div className="mb-4">
                <p className="font-semibold">Course ID: {selectedCourse._id}</p>
                <p className="font-semibold">Faculty ID: {selectedCourse.fid}</p>
                <p className="font-semibold">Semester: {selectedCourse.semester}</p>
                <p className="font-semibold">Course Class: {selectedCourse.courseClass}</p>
                <p className="font-semibold">Course Code: {selectedCourse.courseCode}</p>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Feedback questions */}
                {courseRatingQuestions.map((question, index) => (
                    <div className="mb-6" key={index}>
                        <p className="text-lg font-semibold">{question.heading}</p>
                        <p className="text-gray-600 mb-2">{question.description}</p>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star, starIndex) => (
                                <button
                                    key={starIndex}
                                    type="button"
                                    onClick={() => handleRatingChange(index, star)}
                                    className={`text-3xl mr-2 focus:outline-none ${star <= ratings[index] ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                    &#9733;
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="comments">Comments</label>
                    <textarea
                        id="comments"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit Feedback</button>
            </form>
        </div>
    );
};

export default CourseFeedbackForm;
