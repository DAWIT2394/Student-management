// backend/models/Enrollment.js
const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollment_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
