const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userType : {
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        unique: true
    },
    password: String,
}, { timestamps: true })

const UserModel = mongoose.model("Admin", adminSchema);

module.exports = UserModel;