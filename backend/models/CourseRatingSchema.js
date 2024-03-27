const mongoose = require("mongoose");

const courseRatingSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  ratings: {
    question1: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    question2: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    question3: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    question4: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    question5: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

const CourseRating = mongoose.model('CourseRating', courseRatingSchema);
module.exports = CourseRating;
