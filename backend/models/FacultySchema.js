const mongoose = require('mongoose');

const FacultySchema =new mongoose.Schema({
  userType:{
    type:String,
    required:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  facultyId:{
    type:String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    require:true
  }
})

const Faculty = mongoose.model('Faculty',FacultySchema);

module.exports = Faculty;

