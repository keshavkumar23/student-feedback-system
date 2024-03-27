import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import FacultyNavbar from './FacultyNavbar';
import { UserContext } from '../UserContext';
const CourseForm = () => {
    const { id } = useContext(UserContext);
    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: '',
        semester: '',
        courseClass: '',
        fid: id
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        console.log("faculty id is ", id)
        console.log('Form submitted:', formData);
        const url = "/api/faculty/createCourse";
        try {
            const { data } = await axios.post(url, formData, { withCredentials: true });
            console.log('Course created successfully:', data);
            setFormData({
                courseName: '',
                courseCode: '',
                semester: '',
                courseClass: '',
                fid: id
            });
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <>
            <FacultyNavbar />
            <div className="max-w-screen-lg mx-auto m-4 p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
                <form onSubmit={handleCourseSubmit} className="grid grid-cols-2 gap-4">
                    <div className="border rounded p-2">
                        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                        <input type="text" id="courseName" name="courseName" value={formData.courseName} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
                        <input type="text" id="courseCode" name="courseCode" value={formData.courseCode} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                        <input type="number" id="semester" name="semester" value={formData.semester} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required min={1}    max={8} />
                    </div>
                    <div className="border rounded p-2">
                        <label htmlFor="courseClass" className="block text-sm font-medium text-gray-700">Course Class</label>
                        <select id="courseClass" name="courseClass" value={formData.courseClass} onChange={handleChange} className="mt-1 p-2 w-full border-gray-300 rounded-md" required>
                            <option value="">Select Class</option>
                            <option value="CS1">CS1</option>
                            <option value="CS2">CS2</option>
                            <option value="CS3">CS3</option>
                            <option value="CS4">CS4</option>
                            <option value="CS5">CS5</option>
                        </select>
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[220px]">Add</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CourseForm;
