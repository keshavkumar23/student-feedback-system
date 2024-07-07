import { useState, useContext } from 'react';
import axios from 'axios';
import facultyRatingQuestions from "./Data/FacultyRatingQuestions"
import { UserContext } from '../UserContext';
const FacultyFeedbackForm = ({ selectedFaculty, setRedirectToFeedback, setFeedbackCode }) => {
    const { id } = useContext(UserContext);

    const [ratings, setRatings] = useState(Array(facultyRatingQuestions.length).fill(0));
    const [comment, setComment] = useState("");
    // Function to handle form submission


    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('rated course ', ratings, id, selectedCourse._id, comment);

        try {
            // Send a POST request to the backend to store the ratings
            const response = await axios.post('/api/student/store-faculty-ratings', {
                facultyId: selectedFaculty._id,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute bg-white p-6 shadow-md rounded-md">
                <p className="text-lg font-semibold mb-5">Faculty Feedback Form</p>
                <div className="w-[40vw] mx-auto p-4 bg-white shadow-md rounded-md h-[70vh] overflow-auto">
                    <h2 className="text-xl font-semibold mb-4">Feedback for {selectedFaculty.firstName + " " + selectedFaculty.lastName}</h2>
                    <div className="mb-4">
                        <p className="font-semibold">Fid : {selectedFaculty._id}</p>
                        <p className="font-semibold">Faculty Id : {selectedFaculty.facultyId}</p>
                        <p className="font-semibold">Department : {selectedFaculty.department}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Feedback questions */}
                        {facultyRatingQuestions.map((question, index) => (
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
                        <div className='flex items-center justify-center gap-5'>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                            <button
                                onClick={() => {
                                    setRedirectToFeedback(false)
                                    setFeedbackCode("")
                                }
                                }
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default FacultyFeedbackForm;
