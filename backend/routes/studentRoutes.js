const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentControllers');

// Routes
router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.get('/active-course-list/:sem', studentController.activeCourse);
router.post('/verify-feedback-code', studentController.validateFeedbackCode);
router.post('/store-course-ratings', studentController.addCourseFeedback);
// router.get('/students', studentController.getStudents);
// router.get('/students/:id', studentController.getStudentById);
// router.put('/students/:id', studentController.updateStudent);
// router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
