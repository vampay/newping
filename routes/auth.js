const express = require('express');
const router = express.Router();
const { register, login, refresh } = require("../controller/authController"); // Adjust path as needed
const authenticateToken = require('../middlewares/auth'); // Middleware for token authentication

// Route for basic response or error handling
router.post("/", (req, res) => {
    res.sendStatus(400); // Bad Request status for incorrect endpoints
    // To register, login, or refresh, use endpoints like: /api/auth/register
});

// Public routes for login and register
router.post("/register", register); // Register does not require token
router.post("/login", login); // Login does not require token

// Protected route for token refresh
router.post("/refresh", authenticateToken, refresh); // Requires token for refreshing access

module.exports = router;
