const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentControllers');

// Routes
router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.get('/active-course-list/:sem', studentController.activeCourse);
router.post('/verify-course-feedback-code', studentController.validateCourseFeedbackCode);
router.post('/store-course-ratings', studentController.addCourseFeedback);
router.post('/verify-faculty-feedback-code', studentController.validateFacultyFeedbackCode);
router.get('/active-faculties', studentController.activeFaculties);
router.post('/store-faculty-ratings', studentController.addFacultyFeedback);
// router.get('/students', studentController.getStudents);
// router.get('/students/:id', studentController.getStudentById);
// router.put('/students/:id', studentController.updateStudent);
// router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
