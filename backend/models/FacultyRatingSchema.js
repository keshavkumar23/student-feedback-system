const mongoose = require("mongoose");

const facultyRatingSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
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

const FacultyRating = mongoose.model('FacultyRating', facultyRatingSchema);
module.exports = FacultyRating;
