import { useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavbar from "./AdminNavbar"
import CourseList from './CourseList';
function FacultyProfile() {
  const [fid, setFid] = useState(null)
  const [facultyData, setFacultyData] = useState(null);
  const [courseData, setCourseData] = useState([]);

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
                </>
              )}
            </div>
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
