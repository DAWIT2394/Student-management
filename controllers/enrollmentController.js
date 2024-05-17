// backend/controllers/enrollmentController.js
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student_id').populate('course_id');
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEnrollment = async (req, res) => {
    const { student_id, course_id } = req.body;

    // Check if student and course exist
    const student = await Student.findById(student_id);
    const course = await Course.findById(course_id);

    if (!student || !course) {
        return res.status(404).json({ message: 'Student or Course not found' });
    }

    const enrollment = new Enrollment({
        student_id: student_id,
        course_id: course_id,
    });

    try {
        const newEnrollment = await enrollment.save();
        res.status(201).json(newEnrollment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id).populate('student_id').populate('course_id');
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.json(enrollment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
        res.json({ message: 'Enrollment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
