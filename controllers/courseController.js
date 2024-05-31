// backend/controllers/courseController.js
const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.createCourse = async (req, res) => {
    try {
        // Check if a course with the same name already exists
        const existingCourse = await Course.findOne({ course_name: req.body.course_name });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course with this name already registered' });
        }

        // Create a new course if no existing course is found
        const course = new Course({
            course_name: req.body.course_name,
            course_description: req.body.course_description,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
        });

        const newCourse = await course.save();
        res.status(201).json({ 
            message: 'Course successfully registered',
            course: newCourse 
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
