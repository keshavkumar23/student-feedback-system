const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const Faculty = require("./models/FacultySchema");
const Student = require("./models/StudentSchema");
const Course = require("./models/CourseSchema");
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");


const app = express();
const port = process.env.PORT || 4040;
const mongoUrl = process.env.MONGO_URL;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Middleware
app.use(cors({
  origin: 'https://student-feedback-system-itbd.onrender.com', // Change this to your frontend origin
  credentials: true // Allow cookies to be sent with the request
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);

// Connect to MongoDB
(async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Database connected");
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
})();

// Test Route
app.get("/test", (req, res) => {
    res.json("Test ok");
});

// Profile Route
app.get("/profile", (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwtSecretKey, {}, (err, userData) => {
            if (err) {
                res.status(401).json('Invalid token');
            } else {
                res.json(userData);
            }
        });
    } else {
        res.status(401).json('No token found');
    }
});

app.get("/faculty-details", async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
      } catch (error) {
        console.error('Error fetching faculties:', error);
        res.status(500).json({ message: 'Error fetching faculties' });
      }
})
app.get("/student-details", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
      } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students' });
      }
})

app.post("/logout", (req, res) => {
    res.clearCookie('token', { sameSite: 'None', secure: true }).json({ message: 'Logged out successfully' });
});


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
