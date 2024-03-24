const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');

// Routes
router.post('/register', adminControllers.registerAdmin);
router.post('/login', adminControllers.loginAdmin);
router.post('/createFaculty', adminControllers.createFaculty);
// router.get('/students', studentController.getStudents);
// router.get('/students/:id', studentController.getStudentById);
// router.put('/students/:id', studentController.updateStudent);
// router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
