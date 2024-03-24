const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const Admin = require("./models/AdminSchema");
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const port = 4040;
const mongoUrl = "mongodb+srv://keshavkumardpr1:saini123@cluster0.5fci1bg.mongodb.net/sfs-keshav";
const jwtSecretKey = "ehfwiehfsdhvlisecbeviubfv;nfnvoiufbvoidflksgkdjblsdgv";

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Change this to your frontend origin
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

app.post("/logout", (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
