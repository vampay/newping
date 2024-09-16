const mongoose = require('mongoose');

const schoolsSchema = new mongoose.Schema({
    school_name: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    location: { type: String, required: true },
    student_count: { type: Number, required: true },
    teacher_name: { type: String, required: true },
    phone_teacher: { type: String, required: true },
    faculty: { type: String, required: true },
    count_participants: {  type: Number, required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Add reference to User model
}, 
{ timestamps: true, versionKey: false });

module.exports = mongoose.model('School', schoolsSchema);
