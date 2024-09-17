const express = require('express');
const router = express.Router();
const School = require('../models/School');
const auth = require('../models/auth');
const {
    getSchool,
    getSchoolID,
    postSchool,
    updateSchool,
    deleteSchool,
} = require('../controller/SchoolController');
const authenticateToken = require('../middlewares/auth');

// Route to get populated school data with user details
router.get('/school', async (req, res) => {
    try {
        const schools = await School.find().populate('user', 'name surname'); // Fetch and populate user details
        res.json(schools);
    } catch (error) {
        console.error('Error fetching school data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

// CRUD operations from SchoolController
router.get('/', getSchool);
router.get('/:id', getSchoolID);
router.post('/', postSchool);
router.put('/:id', updateSchool);
router.delete('/:id', deleteSchool);

module.exports = router;
