const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create a Student model based on the student schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
