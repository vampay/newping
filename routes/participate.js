const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const { getParticipate, getParticipateID, postParticipate, updateParticipate, deleteParticipate,} = require("../controller/participateController");

 router.get("/",authenticateToken,  getParticipate);
 router.get("/:id",authenticateToken,  getParticipateID);
 router.post("/",authenticateToken,  postParticipate);
 router.put("/:id",authenticateToken, updateParticipate);
 router.delete("/:id",authenticateToken,  deleteParticipate);



module.exports = router;
