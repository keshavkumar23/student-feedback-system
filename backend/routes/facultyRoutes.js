const express = require('express');
const router = express.Router();
const facultyControllers = require('../controllers/facultyControllers');

// Routes
router.post('/login', facultyControllers.loginFaculty);
router.post('/createCourse', facultyControllers.AddCourse);
router.put('/course/:id/activate', facultyControllers.ActivateCourse);
router.put('/course/:id/deactivate', facultyControllers.DeactivateCourse);
router.get('/course-list/:fid', facultyControllers.CourseList);
// router.get('/students', studentController.getStudents);
// router.get('/students/:id', studentController.getStudentById);
// router.put('/students/:id', studentController.updateStudent);
// router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
