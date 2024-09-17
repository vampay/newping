const express = require('express');
const router = express.Router();
const authController = require('../controller/userController'); // Adjust path as needed

<<<<<<< HEAD
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
router.post('/api/auth/refresh', authController.refresh);


module.exports = router;
=======
const { register, login, refresh } = require("../controller/authController");
const authenticateToken = require('../middlewares/auth');

router.post("/", async (req,res) => {
    res.sendStatus(400);
    //เวลารันเพื่อregister login refresh  ต้อง localhost:3000/api/auth/register 
});

router.post("/register",authenticateToken, register);
router.post("/login" , login);
router.post("/refresh" ,authenticateToken, refresh);//ขอtoken accessมั้ย

module.exports = router;
>>>>>>> 693e98e502f3e6a788e230797dae47307d786ee8
