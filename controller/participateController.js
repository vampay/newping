const express = require("express");
const Participate = require("../models/participate");

// Get all participants with populated school data
exports.getParticipate = async (req, res) => {
    try {
        // Populate school_id to get school_name from the School model
        const participates = await Participate.find().populate('school_id', 'school_name');
        res.status(200).json(participates);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch participants', error: error.message });
    }
};

// Get a specific participant by ID with populated school data
exports.getParticipateID = async (req, res) => {
    try {
        const { id } = req.params;
        // Populate school_id to get school_name
        const participate = await Participate.findById(id).populate('school_id', 'school_name');
        if (participate) {
            res.status(200).json(participate);
        } else {
            res.status(404).json({ message: 'Participate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch participant', error: error.message });
    }
};

// Create a new participant
exports.postParticipate = async (req, res) => {
    try {
        const { name, surname, course, Boarding_point, school_id } = req.body;

        // Validate required fields
        if (!name || !surname || !course || !Boarding_point || !school_id) {
            return res.status(400).json({ message: 'All fields including school_id are required' });
        }

        const participate = new Participate({ name, surname, course, Boarding_point, school_id });
        const savedParticipate = await participate.save();
        res.status(201).json(savedParticipate);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create participant', error: error.message });
    }
};

// Update a participant
exports.updateParticipate = async (req, res) => {
    try {
        const { id } = req.params;
        const participate = await Participate.findById(id);

        if (!participate) {
            return res.status(404).json({ message: 'Participate not found' });
        }

        const { name, surname, course, Boarding_point, school_id } = req.body;

        // Update only the provided fields
        if (name) participate.name = name;
        if (surname) participate.surname = surname;
        if (course) participate.course = course;
        if (Boarding_point) participate.Boarding_point = Boarding_point;
        if (school_id) participate.school_id = school_id;

        const updatedParticipate = await participate.save();
        res.status(200).json(updatedParticipate);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update participant', error: error.message });
    }
};

// Delete a participant
exports.deleteParticipate = async (req, res) => {
    try {
        const { id } = req.params;
        const participate = await Participate.findById(id);

        if (!participate) {
            return res.status(404).json({ message: 'Participate not found' });
        }

        await Participate.findByIdAndDelete(id);
        res.status(200).json({ message: 'Participate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete participant', error: error.message });
    }
};
