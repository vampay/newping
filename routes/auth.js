const express = require('express');
const router = express.Router();
const authController = require('../controller/userController'); // Adjust path as needed

router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
router.post('/api/auth/refresh', authController.refresh);


module.exports = router;
