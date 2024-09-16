const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");// Corrected from Product to User


require('dotenv').config();
// Register function
exports.register = async (req, res) => {
    const { email, password, name, surname, course, role } = req.body;

    // Check for missing fields
    if (!email || !password || !name || !surname || !course || !role) {
        return res.status(400).json({ error: 'All required fields must be provided' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User({
            email,
            password: hashedPassword,
            name,
            surname,
            course,
            role: role || 'user'  // Set default role if not provided
        });

        // Save user to the database
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user and include the password field for comparison
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Remove the password before sending the user object
        user.password = undefined;

        // Send response with redirect URL based on user role
        const redirectUrl = user.role === 'admin' ? '/homepage_admin' : '/homepage';
        return res.json({ user, redirectUrl });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// refresh
exports.refresh = async (req, res) => {
    const { token } = req.body; // Extract the token from the request body

    if (!token) {
        return res.sendStatus(401); // If no token is provided, respond with 401 Unauthorized
    }

    // Verify the refresh token using the REFRESH_TOKEN_SECRET
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Refresh token expired or invalid"); // Send 403 Forbidden if the token is invalid or expired
        }

        // Generate a new access token
        const accessToken = jwt.sign(
            { userId: user.userId }, // Extract userId from the decoded token
            process.env.ACCESS_TOKEN_SECRET, // Use the ACCESS_TOKEN_SECRET for signing
            { expiresIn: "15m" } // Set the access token to expire in 15 minutes
        );

        // Respond with the new access token
        res.json({ accessToken });
    });
};
