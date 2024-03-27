const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  fid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  courseClass: {
    type: String,
    required: true,
    enum: ['CS1', 'CS2', 'CS3', 'CS4', 'CS5']
  },
  active: {
    type: Boolean,
    default: false,
  },
  feedbackCode : {
    type: String,
    default: ""
  },
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
