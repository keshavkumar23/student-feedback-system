const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require("../models/AdminSchema");
const Faculty = require("../models/FacultySchema");



const jwtSecretKey = "ehfwiehfsdhvlisecbeviubfv;nfnvoiufbvoidflksgkdjblsdgv";


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

module.exports = {
    registerAdmin,
    loginAdmin,
    createFaculty
};
