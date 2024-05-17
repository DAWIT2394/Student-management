// backend/routes/enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', enrollmentController.getAllEnrollments);
router.post('/', enrollmentController.createEnrollment);
router.get('/:id', enrollmentController.getEnrollmentById);
router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;
