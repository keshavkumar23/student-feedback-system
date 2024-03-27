import { useState, useEffect } from 'react';
import { Link, } from "react-router-dom"
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";
import FacultyRegistrationForm from './FacultyRegisterForm';

export default function FacultyDetails() {
  const [facultyData, setFacultyData] = useState([]);
  const [facultyFormModal, setFacultyFormModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/faculty-details');
        setFacultyData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <AdminNavbar />
      <div className="relative">
        {/* <div className="max-w-screen overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">FID</th>
                  <th scope="col" className="px-6 py-4">First Name</th>
                  <th scope="col" className="px-6 py-4">Last Name</th>
                  <th scope="col" className="px-6 py-4">Faculty Id</th>
                  <th scope="col" className="px-6 py-4">Department</th>
                  <th scope="col" className="px-6 py-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {facultyData.map((faculty) => (
                  <tr
                    key={faculty._id}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{faculty._id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{faculty.firstName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{faculty.lastName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{faculty.facultyId}</td>
                    <td className="whitespace-nowrap px-6 py-4">{faculty.department}</td>
                    <td className="whitespace-nowrap px-6 py-4">{faculty.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {facultyFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-6 shadow-md rounded-md">
            <FacultyRegistrationForm onClose={() => setFacultyFormModal(false)} setFacultyFormModal={setFacultyFormModal} />
          </div>
        </div>
      )}
      <Link to="/admin/faculty-details/faculty/profile" className="fixed bottom-6 right-[200px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">
        View Faculty Profile
      </Link>
      <button
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
        onClick={() => setFacultyFormModal(true)}
      >
        Add New Faculty
      </button>
      {/* </div> */}
    </>
  );
}
