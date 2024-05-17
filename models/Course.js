// backend/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    course_description: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
});

module.exports = mongoose.model('Course', CourseSchema);
