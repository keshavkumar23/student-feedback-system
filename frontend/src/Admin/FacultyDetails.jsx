import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import AdminNavbar from "./AdminNavbar";
import FacultyRegistrationForm from './FacultyRegisterForm';
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserContext } from '../UserContext';

export default function FacultyDetails() {
  const [facultyData, setFacultyData] = useState([]);
  const [facultyFormModal, setFacultyFormModal] = useState(false);
  const [feedbackCode, setFeedbackCode] = useState("");
  const [activeFacultyId, setActiveFacultyId] = useState(null);
  const { id } = useContext(UserContext);
  
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
  }, [id]);

  const generateFeedbackCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleActivate = async (facultyId) => {
    console.log('activate ', facultyId);
    
    try {
      const code = generateFeedbackCode();
      await axios.put(`/api/admin/faculty/${facultyId}/activate`, { facultyFeedbackCode: code });
      setFeedbackCode(code);
      setActiveFacultyId(facultyId);
    } catch (error) {
      console.error('Error activating faculty:', error);
    }
  };

  const handleDeactivate = async(facultyId) => {
    console.log('deactivate ', facultyId);
    try {
      await axios.put(`/api/admin/faculty/${facultyId}/deactivate`);
      setActiveFacultyId(null);
    } catch (error) {
      console.error('Error deactivating course:', error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="relative">
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
                  {/* <th scope="col" className="px-6 py-4"></th>    */}
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
                    <td className="whitespace-nowrap px-6 py-4 cursor-pointer">
                      <BsThreeDotsVertical onClick={() => setActiveFacultyId(activeFacultyId === faculty._id ? null : faculty._id)} />
                      {activeFacultyId === faculty._id && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg">
                          <div className="py-2 px-4 text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={() => handleActivate(faculty._id)}>
                            Activate
                          </div>
                          <div className="py-2 px-4 text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={() => handleDeactivate(faculty._id)}>
                            Deactivate
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal to show random number */}
      {feedbackCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-6 shadow-md rounded-md flex flex-col">
            <p className="text-lg font-semibold">Faculty Feedback Code: {feedbackCode}</p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md"
              onClick={() => setFeedbackCode('')} // This function resets the feedbackCode state, closing the modal
            >
              Close
            </button>
          </div>
        </div>
      )}

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
    </>
  );
}
