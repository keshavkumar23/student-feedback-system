import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

function FacultyDetails() {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/student-details');
                setStudentData(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    return (
        <>
    <AdminNavbar/>
    <div className="flex flex-col">
      {/* <div className="overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">S. No.</th>
                  <th scope="col" className="px-6 py-4">First Name</th>
                  <th scope="col" className="px-6 py-4">Last Name</th>
                  <th scope="col" className="px-6 py-4">Semester</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr
                    key={student._id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{student.firstName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{student.lastName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{student.semester}</td>
                    <td className="whitespace-nowrap px-6 py-4">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {/* </div> */}
    </>
    );
}

export default FacultyDetails;

