const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');

// Routes
router.post('/register', adminControllers.registerAdmin);
router.post('/login', adminControllers.loginAdmin);
router.post('/createFaculty', adminControllers.createFaculty);
router.get('/faculty/:fid', adminControllers.getFacultyProfile);
router.get('/courses/:fid', adminControllers.getFacultyCourses);
router.get('/course/score/:id', adminControllers.getCourseScore);
// router.get('/students', studentController.getStudents);
// router.get('/students/:id', studentController.getStudentById);
// router.put('/students/:id', studentController.updateStudent);
// router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
