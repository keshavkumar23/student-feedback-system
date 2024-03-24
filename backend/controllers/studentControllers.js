const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require("../models/StudentSchema");

// Controller function to create a new student

const jwtSecretKey = "ehfwiehfsdhvlisecbeviubfv;nfnvoiufbvoidflksgkdjblsdgv";
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
        const token = jwt.sign({ userId: newStudent._id, userType, firstName, lastName, semester }, jwtSecretKey, { expiresIn: '1h' });

        // Set token as a cookie and send response
        res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
            id: newStudent._id,
            userType: newStudent.userType,
            firstName: newStudent.firstName,
            lastName: newStudent.lastName,
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

module.exports = {
    registerStudent,
    loginStudent
};
