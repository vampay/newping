const mongoose = require('mongoose');

const participateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    major: { type: String, required: true }, // 'major' from HEAD branch
    course: { type: String }, // 'course' from other branch
    Boarding_point: { type: String, required: true },
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School' } // Reference to School model
}, 
{ timestamps: true, versionKey: false });

const Participate = mongoose.model('Participate', participateSchema);
module.exports = Participate;
