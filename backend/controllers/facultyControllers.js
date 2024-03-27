const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Faculty = require("../models/FacultySchema");
const Course = require("../models/CourseSchema");


const jwtSecretKey = process.env.JWT_SECRET_KEY;

const loginFaculty = async (req, res) => {
    const { userType, email, password } = req.body;
    if (userType === 'faculty') {
        const foundUser = await Faculty.findOne({ email });
        if (foundUser) {
            const isUser = bcrypt.compareSync(password, foundUser.password);
            if (isUser) {
                jwt.sign({ userId: foundUser._id, userType }, jwtSecretKey, {}, (err, token) => {
                    res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                        id: foundUser._id,
                        userType: userType,
                    })
                })
            }
        }
    }

}

const AddCourse = async (req, res) => {
    try {
        const { fid, courseName, courseCode, semester, courseClass} = req.body;

        const existingCourse = await Course.findOne({ courseCode, fid, courseClass });
        if (existingCourse) {
            return res.status(400).json({ error: 'Course with this code and faculty already exists' });
        }

        // Create a new course document
        const newCourse = new Course({
            fid,
            courseName,
            courseCode,
            semester,
            courseClass,
        });

        // Save the new course document to the database
        const savedCourse = await newCourse.save();

        // Return the saved course as response
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const CourseList=  async (req, res) => {
    try {
        const facultyId = req.params.fid;
        // console.log('hello from backend', facultyId);
        const courses = await Course.find({fid : facultyId});
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const ActivateCourse = async (req, res) => {
    const courseId = req.params.id;
    const { courseFeedbackCode } = req.body;

    try {
        // Find the course by ID
        const course = await Course.findById(courseId);

        // If course not found, return 404 status
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the course is already active
        if (course.active) {
            return res.status(400).json({ message: 'Course is already active' });
        }

        // Set the feedback code and activate the course
        course.active = true;
        course.feedbackCode = courseFeedbackCode;

        // Save the updated course
        await course.save();

        // Return the updated course
        res.json(course);
    } catch (error) {
        // Return error status and message if any error occurs
        console.error('Error activating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const DeactivateCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        // Find the course by ID
        const course = await Course.findById(courseId);

        // If course not found, return 404 status
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (!course.active) {
            return res.status(400).json({ message: 'Course is already deactive' });
        }

        // Toggle the 'active' status of the course
        course.active = false;
        course.feedbackCode = ""
        // Save the updated course
        await course.save();

        // Return the updated course
        res.json(course);
    } catch (error) {
        // Return error status and message if any error occurs
        console.error('Error toggling course activation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    loginFaculty,
    AddCourse,
    CourseList,
    ActivateCourse,
    DeactivateCourse
};
