import { useEffect, useState } from 'react';
import axios from "axios"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend, CartesianGrid } from "recharts"

function CourseList({ courses }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courseRatings, setCourseRatings] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
    }, []);

    const viewCourseScore = async (id) => {
        console.log('course id to view score is ', id);
        try {
            const response = await axios.get(`/api/admin/course/score/${id}`);
            console.log('here is the response of the course score ', response, response.data);

            setCourseRatings(response.data);
        } catch (error) {
            console.error('Error fetching course ratings:', error);
        }
    }

    // const starData = [
    //     {
    //         starName: '1 Star',
    //         students: 20,
    //     },
    //     {
    //         starName: '2 Star',
    //         students: 40,
    //     },
    //     {
    //         starName: '3 Star',
    //         students: 55,
    //     },
    //     {
    //         starName: '4 Star',
    //         students: 60,
    //     },
    //     {
    //         starName: '5 Star',
    //         students: 70,
    //     },
    // ];
    const Colors = ['#ff0000', '#FF8042', '#FFBB28', '#0088FE', '#00C49F'];
    const questions = [
        'Question 1 : How would students rate their overall experience in this course ?',
        'Question 2 : Did this course content align with the expectations and goals of the students ?',
        'Question 3 : Did students feel that they achieved the learning objectives and goals of this course?', 'Question 4 : How well was the course organized and structured ?',
        'Question 5 : How engaged was the instructor during the course sessions ?'
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const handleViewScore = (id) => {
        setIsModalOpen(true);
        // setSelectedCourseId(id);
        viewCourseScore(id);
    }

    const closeModal = () => {
        setIsModalOpen(false)
        // setCourseRatings([]);
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-10 mb-16 w-[90vw]">
                {courses.map(course => (
                    <div key={course._id}>
                        <div className="bg-white p-4 rounded-md border shadow-md w-full md:w-auto lg:w-auto xl:w-auto">
                            <p className="text-lg font-semibold mb-2">{course.courseName}</p>
                            <p className="text-gray-600 mb-2">Course Code: {course.courseCode}</p>
                            <p className="text-gray-600 mb-2">Semester: {course.semester}</p>
                            <p className="text-gray-600 mb-2">Course Class: {course.courseClass}</p>

                            <div className="mt-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => handleViewScore(course._id)}
                                >
                                    View Score
                                </button>
                            </div>
                            {/* {userType === 'faculty' && (    
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => deactivateCourse(course._id)}
                                    >
                                        Deactivate
                                    </button>
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    {courseFeedbackCodes[course._id] && <div>Feedback Code: {courseFeedbackCodes[course._id]}</div>}
                                
                            )} */}
                        </div>
                    </div>
                ))}
                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="bg-white p-8 rounded shadow-md h-[80vh] w-[80vw] overflow-auto">
                            <h2 className="text-xl font-bold mb-4">Course Ratings</h2>
                            {courseRatings ? (
                                <div className="">
                                    {courseRatings.map((data, index) => (
                                        <>
                                            <h2 className='m-6'>{questions[index]}</h2>
                                            <div key={index} className="flex justify-center items-center ">
                                                {/* Bar Chart */}
                                                <div className="w-1/2 mr-4">
                                                    <ResponsiveContainer width="100%" height={400}>
                                                        <BarChart data={data}>
                                                            <XAxis dataKey="star" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                                                            <Bar dataKey="students" fill="#8883d8" />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>

                                                {/* Pie Chart */}
                                                <div className="w-1/2">
                                                    <ResponsiveContainer width="100%" height={400}>
                                                        <PieChart>
                                                            <Tooltip formatter={(value, name) => [`${name + 1} Stars : ${value} Student`]} labelStyle={{ color: 'blue' }}/>
                                                            <Legend formatter={(value) => value + 1} />
                                                            <Pie
                                                                data={data}
                                                                cx="50%"
                                                                cy="50%"
                                                                labelLine={true}
                                                                label={renderCustomizedLabel}
                                                                outerRadius={100}
                                                                dataKey="students"
                                                            >
                                                                {data.map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                                                                ))}
                                                            </Pie>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </>
                                    ))}

                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                            <button
                                onClick={() => closeModal()}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 absolute top-4 right-4"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseList;
