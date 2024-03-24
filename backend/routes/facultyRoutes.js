const express = require('express');
const router = express.Router();
const facultyControllers = require('../controllers/facultyControllers');

// Routes
router.post('/login', facultyControllers.loginFaculty);
// router.get('/students', studentController.getStudents);
// router.get('/students/:id', studentController.getStudentById);
// router.put('/students/:id', studentController.updateStudent);
// router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
