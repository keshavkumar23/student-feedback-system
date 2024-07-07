const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require("../models/AdminSchema");
const Faculty = require("../models/FacultySchema");
const Course = require('../models/CourseSchema');
const CourseRating = require('../models/CourseRatingSchema');
const FacultyRating = require('../models/FacultyRatingSchema');


const jwtSecretKey = process.env.JWT_SECRET_KEY;


const admins = ['admin@gmail.com', "admin2@gmail.com"]
const saltRounds = 10;

// Generate salt synchronously
const bcryptSalt = bcrypt.genSaltSync(saltRounds);

const registerAdmin = async (req, res) => {
    const { userType, firstName, lastName, email, password } = req.body;

    try {
        // Check if admin with the provided email already exists
        const foundUser = await Admin.findOne({ email });

        if (foundUser) {
            return res.status(500).json("Admin already exists");
        }

        // Check if the provided email is in the list of admin emails
        if (!admins.includes(email)) {
            return res.status(403).json("You are not authorized to register as an admin");
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        // Create a new admin user
        const createdUser = await Admin.create({
            userType: userType,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        // Generate JWT token
        jwt.sign({ 
            userId: createdUser._id, userType, firstName, lastName }, jwtSecretKey, {}, (err, token) => {
            if (err) {
                throw err;
            }
            // Set token as a cookie and send response
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
                userType: createdUser.userType,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
}

const loginAdmin = async (req, res) => {
    const { userType, email, password } = req.body;
    if (userType === 'admin') {
        const foundUser = await Admin.findOne({ email });
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

const createFaculty = async (req, res) => {
    const { userType, firstName, lastName, facultyId, department, email, password } = req.body;

    try {
        const foundUser = await Faculty.findOne({ email });

        if (foundUser) {
            return res.status(500).json("Faculty already exists");
        }

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        const createdUser = await Faculty.create({
            userType: userType,
            firstName: firstName,
            lastName: lastName,
            facultyId: facultyId,
            department: department,
            email: email,
            password: hashedPassword
        });
        res.status(201).json({
            id: createdUser._id,
            userType: createdUser.userType,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            facultyId: createdUser.facultyId,
            department: createdUser.department,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json("Error");
    }
}

const getFacultyProfile = async (req, res) => {
    const { fid } = req.params;
    try {
      // Fetch faculty data from the database based on fid
      const faculty = await Faculty.findOne({ _id: fid });
      
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty not found' });
      }
  
      // Respond with only the required faculty data
      const { firstName, lastName, facultyId, email, department } = faculty;
      res.status(200).json({ firstName, lastName, facultyId, email, department });
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const getFacultyCourses = async (req, res) => {
    const { fid } = req.params;
    try {
        const courses = await Course.find({ fid :  fid });
        // console.log('courses from backend are 1', courses);
        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found for this faculty ID" });
        }
        // console.log("courses 2 ", courses)
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching the courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getCourseScore = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the course ratings by courseId
        const courses = await CourseRating.find({ courseId: id });

        // Check if any courses were found
        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: 'No course ratings found for the given course ID' });
        }

        // Initialize an object to store the ratings for each question
        const ratings = {
            question1: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question2: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question3: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question4: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question5: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
        };

        // Loop through each course and update the ratings object
        courses.forEach(course => {
            Object.keys(course.ratings).forEach(question => {
                ratings[question][course.ratings[question]]++;
            });
        });

        // Convert the ratings object into the desired response format
        const response = Object.keys(ratings).map(question => {
            return {
                question,
                ratings: Object.keys(ratings[question]).map(star => ({
                    star: parseInt(star),
                    students: ratings[question][star]
                }))
            };
        });
        
        const starData = response.map(question => question.ratings);


        // Return the response
        // console.log("Response:", starData);
        res.status(200).json(starData);
    } catch (error) {
        console.error('Error fetching course ratings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const activateFaculty = async (req, res) => {
    const facultyId = req.params.id;
    const { facultyFeedbackCode } = req.body;

    try {
        // Find the faculty by ID
        const faculty = await Faculty.findById(facultyId);

        // If faculty not found, return 404 status
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        // Check if the faculty is already active
        if (faculty.active === 'true') {
            return res.status(400).json({ message: 'Faculty is already active' });
        }

        // Set the feedback code and activate the faculty
        faculty.active = 'true';
        faculty.feedbackCode = facultyFeedbackCode;

        // Save the updated faculty
        await faculty.save();

        // Return the updated course
        res.json(faculty);
    } catch (error) {
        // Return error status and message if any error occurs
        console.error('Error activating faculty : ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deactivateFaculty = async (req, res) => {
    const facultyId = req.params.id;

    try {
        // Find the course by ID
        const faculty = await Faculty.findById(facultyId);

        // If faculty not found, return 404 status
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        if (faculty.active === 'false') {
            return res.status(400).json({ message: 'Faculty is already deactivated' });
        }

        // Toggle the 'active' status of the faculty
        faculty.active = 'false';
        faculty.feedbackCode = ""
        // Save the updated course
        await faculty.save();

        // Return the updated course
        res.json(faculty);
    } catch (error) {
        // Return error status and message if any error occurs
        console.error('Error deactivating faculty activation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getFacultyScore = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the course ratings by courseId
        const faculties = await FacultyRating.find({ facultyId: id });

        // Check if any courses were found
        if (!faculties || faculties.length === 0) {
            return res.status(404).json({ message: 'No faculty ratings found for the given faculty ID' });
        }

        // Initialize an object to store the ratings for each question
        const ratings = {
            question1: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question2: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question3: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question4: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
            question5: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
        };

        // Loop through each course and update the ratings object
        faculties.forEach(course => {
            Object.keys(course.ratings).forEach(question => {
                ratings[question][course.ratings[question]]++;
            });
        });

        // Convert the ratings object into the desired response format
        const response = Object.keys(ratings).map(question => {
            return {
                question,
                ratings: Object.keys(ratings[question]).map(star => ({
                    star: parseInt(star),
                    students: ratings[question][star]
                }))
            };
        });
        
        const starData = response.map(question => question.ratings);


        // Return the response
        // console.log("Response:", starData);
        res.status(200).json(starData);
    } catch (error) {
        console.error('Error fetching faculty ratings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = {
    registerAdmin,
    loginAdmin,
    createFaculty,
    getFacultyProfile,
    getFacultyCourses,
    getCourseScore,
    activateFaculty,
    deactivateFaculty,
    getFacultyScore
};
