// backend/models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    enrollment_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', StudentSchema);
