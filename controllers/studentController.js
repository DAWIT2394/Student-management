// backend/controllers/studentController.js
const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
    try {
        // Default values for page and limit if they are not provided in the query
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Calculate the start index
        const startIndex = (page - 1) * limit;
        
        // Get the total count of students
        const totalStudents = await Student.countDocuments();
        
        // Get the students for the current page
        const students = await Student.find().skip(startIndex).limit(limit);
        
        // Prepare the pagination response
        const pagination = {
            totalItems: totalStudents,
            totalPages: Math.ceil(totalStudents / limit),
            currentPage: page,
            pageSize: limit
        };

        res.json({ pagination, students });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 


exports.createStudent = async (req, res) => {
    const { name, email, date_of_birth, enrollment_date } = req.body;

    try {
        // Check if a student with the same email already exists
        const existingStudent = await Student.findOne({ email: email });
        if (existingStudent) {
            return res.status(400).json({ message: 'A student with this email already exists' });
        }

        // Create a new student
        const student = new Student({
            name: name,
            email: email,
            date_of_birth: date_of_birth,
            enrollment_date: enrollment_date || Date.now()  // Add enrollment_date if provided or use current date
        });

        // Save the student to the database
        const newStudent = await student.save();
        res.status(201).json({
            message: 'Student successfully registered',
            student: newStudent
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to get student by name
exports.getStudentsByName = async (req, res) => {
    try {
        const students = await Student.find({ name: new RegExp(req.params.name, 'i') }).sort({ name: 1 });
        if (students.length === 0) return res.status(404).json({ message: 'No students found' });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
