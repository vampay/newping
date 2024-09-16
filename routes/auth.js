const express = require("express");
const router = express.Router();

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