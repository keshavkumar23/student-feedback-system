import { useState } from 'react';
import axios from 'axios';

const FacultyRegistrationForm = ({setFacultyFormModal}) => {
    const [formData, setFormData] = useState({
        userType: 'faculty',
        firstName: '',
        lastName: '',
        facultyId: '',
        department: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFacultyRegister = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        const url = "/api/admin/createFaculty";
        try {
            const { data } = await axios.post(url, formData, { withCredentials: true });
            console.log('Faculty created successfully:', data);
            // Reset form fields
            setFormData({
                userType: 'faculty',
                firstName: '',
                lastName: '',
                facultyId: '',
                department: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Error creating faculty:', error);
        }
        setFacultyFormModal(false);
    };
    

    return (
        <>
            <div className="max-w-screen-lg mx-auto m-4 p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Faculty Registration Form</h2>
                <form onSubmit={handleFacultyRegister} className="grid grid-cols-2 gap-4">
                    <div className="border rounded p-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="facultyId" className="block text-sm font-medium text-gray-700">Faculty ID</label>
                        <input type="text" id="facultyId" name="facultyId" value={formData.facultyId} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[220px]"
                        >
                            Register
                        </button>
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[220px]"
                        onClick={() => setFacultyFormModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FacultyRegistrationForm;
