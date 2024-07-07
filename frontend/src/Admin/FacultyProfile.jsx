import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from "./AdminNavbar"
import CourseList from './CourseList';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import questions from "../Student/Data/FacultyRatingQuestions"
function FacultyProfile() {

  const [fid, setFid] = useState(null)
  const [facultyData, setFacultyData] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facultyRatings, setFacultyRatings] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchFacultyProfileData = async () => {
    try {
      const responseFaculty = await axios.get(`api/admin/faculty/${fid}`);
      const responseCourse = await axios.get(`api/admin/courses/${fid}`);
      setCourseData(responseCourse.data);
      setFacultyData(responseFaculty.data);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('dis is ', fid);
    fetchFacultyProfileData();


  }

  const viewFacultyScore = async (id) => {
    // console.log('course id to view score is ', id);
    try {
      const response = await axios.get(`/api/admin/faculty/score/${id}`);
      // console.log('here is the response of the faculty score ', response, response.data);

      setFacultyRatings(response.data);
    } catch (error) {
      console.error('Error fetching faculty ratings:', error);
    }
  }
  const handleViewScore = async (id) => {
    console.log('here is the fid of the faculty ', id);
    setIsModalOpen(true);
    viewFacultyScore(id);
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFacultyRatings([]);
  }

  const Colors = ['#ff0000', '#FF8042', '#FFBB28', '#0088FE', '#00C49F'];
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
  return (
    <>
      <AdminNavbar />
      <form onSubmit={handleSubmit} className='flex justify-center flex-col items-center mt-6'>
        <div className='flex items-center justify-center gap-3'>
          <label htmlFor="fid" className="font-bold">
            Enter FID:
          </label>
          <input
            type="text"
            id="fid"
            value={fid}
            onChange={(e) => setFid(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Faculty ID"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="flex justify-center">
        <div className="w-[60vw] mt-10">
          <div className="bg-white shadow-md rounded-lg flex">
            <div className="w-1/2 p-10">
              {fid && facultyData && (
                <>

                  <h2 className="text-xl font-bold mb-4">Faculty Information</h2>
                  <p><strong>First Name:</strong> {facultyData.firstName}</p>
                  <p><strong>Last Name:</strong> {facultyData.lastName}</p>
                  <p><strong>Faculty ID:</strong> {facultyData.facultyId}</p>
                  <p><strong>Email:</strong> {facultyData.email}</p>
                  <p><strong>Department:</strong> {facultyData.department}</p>
                  <div className="mt-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleViewScore(fid)}
                    >
                      View Score
                    </button>
                  </div>
                </>
              )}
            </div>
            {isModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white p-8 rounded shadow-md h-[80vh] w-[80vw] overflow-auto">
                  <h2 className="text-xl font-bold mb-4">Faculty Ratings</h2>
                  {facultyRatings ? (
                    <div className="">
                      {facultyRatings.map((data, index) => (
                        <div key={index}>
                          <h2 className='m-6'>{index + 1} : {questions[index].description}</h2>
                          <div className="flex justify-center items-center ">
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
                                  <Tooltip formatter={(value, name) => [`${name + 1} Stars : ${value} Student`]} labelStyle={{ color: 'blue' }} />
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
                        </div>
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
      </div>
      {
        fid && facultyData && courseData && (

          <CourseList courses={courseData} />

        )
      }
    </>
  );
}

export default FacultyProfile;
