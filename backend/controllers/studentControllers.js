const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require("../models/StudentSchema");
const Course = require("../models/CourseSchema");
const CourseRating = require("../models/CourseRatingSchema");

// Controller function to create a new student

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const registerStudent = async (req, res) => {
    const { userType, firstName, lastName, email, password, semester } = req.body;

    try {
        // Check if student with the provided email already exists
        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400).json({ error: "Student already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const newStudent = new Student({
            userType,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            semester
        });

        // Save the student to the database
        await newStudent.save();

        // Generate JWT token
        const token = jwt.sign({
            userId: newStudent._id,
            userType,
            // firstName, 
            // lastName, 
            semester
        }, jwtSecretKey, { expiresIn: '1h' });

        // Set token as a cookie and send response
        res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
            id: newStudent._id,
            userType: newStudent.userType,
            // firstName: newStudent.firstName,
            // lastName: newStudent.lastName,
            semester: newStudent.semester
        });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const loginStudent = async (req, res) => {
    const { userType, email, password } = req.body;
    if (userType === 'student') {
        const foundUser = await Student.findOne({ email });
        if (foundUser) {
            const isUser = bcrypt.compareSync(password, foundUser.password);
            if (isUser) {
                jwt.sign({
                    userId: foundUser._id, userType: foundUser.userType,
                    // firstName: foundUser.firstName,
                    // lastName: foundUser.lastName,
                    semester: foundUser.semester
                }, jwtSecretKey, {}, (err, token) => {
                    res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                        id: foundUser._id,
                        userType: foundUser.userType,
                        // firstName: foundUser.firstName,
                        // lastName: foundUser.lastName,
                        semester: foundUser.semester
                    })
                })
            }
        }
    }

}
const activeCourse = async (req, res) => {
    try {
        const semester = req.params.sem;
        const courses = await Course.find({semester: semester, active: true});
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const validateFeedbackCode = async (req, res) => {
    try {
        const { courseId, feedbackCode } = req.body;

        // Find the course by courseId
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Compare the feedback code
        if (course.feedbackCode === feedbackCode) {
            return res.json({ valid: true, message: 'Feedback code is valid' });
        } else {
            return res.json({ valid: false, message: 'Invalid feedback code' });
        }
    } catch (error) {
        console.error('Error verifying feedback code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addCourseFeedback = async (req, res) => {
    try {
        const { courseId, studentId, ratings, comment } = req.body;

        const existingFeedback = await CourseRating.findOne({ courseId, studentId });
        if (existingFeedback) {
            return res.status(400).json({ error: 'Feedback already submitted for this course' });
        }

        // Convert ratings array to an object with keys question1, question2, ...
        const ratingsObject = {};
        ratings.forEach((rating, index) => {
            ratingsObject[`question${index + 1}`] = rating;
        });

        const newRating = new CourseRating({
            courseId,
            studentId,
            ratings: ratingsObject,
            comment
        });

        await newRating.save();

        res.status(201).json({ message: 'Course rating saved successfully' });
    } catch (error) {
        console.error('Error saving course rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = {
    registerStudent,
    loginStudent,
    activeCourse,
    validateFeedbackCode,
    addCourseFeedback
};
