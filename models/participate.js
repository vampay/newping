const mongoose = require('mongoose');

const participateSchema = new mongoose.Schema({
    name: String,
    surname: String,
    course: String,
    Boarding_point: String,
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School' } // Reference to School model
  });

const Participate = mongoose.model('Participate', participateSchema);
module.exports = Participate;
