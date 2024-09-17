const mongoose = require('mongoose');

const participateSchema = new mongoose.Schema({
<<<<<<< HEAD
    name: { type: String, required: true },
    surname: { type: String, required: true },
    major: { type: String, required: true },
    Boarding_point: { type: String, required: true },
}, 
{ timestamps: true, versionKey: false });
=======
    name: String,
    surname: String,
    course: String,
    Boarding_point: String,
    school_id: { type: mongoose.Schema.Types.ObjectId, ref: 'School' } // Reference to School model
  });
>>>>>>> 693e98e502f3e6a788e230797dae47307d786ee8

const Participate = mongoose.model('Participate', participateSchema);
module.exports = Participate;
