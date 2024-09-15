const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const app = express();

const School = require("./models/School");

app.use(express.json());

dotenv.config(); //บรรทัดนี้โหลดตัวแปรสภาพแวดล้อมจาก.envไฟล์ลงใน ไฟล์
mongoose
  .connect(process.env.MONGO_DB_URL, {})
  /*บรรทัดนี้พยายามเชื่อมต่อกับฐานข้อมูลMongoDB โดยใช้ Mongoose ซึ่งเป็นไลบรารี ODM  */
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

const participateRoutes = require("./routes/participate");
app.use("/api/participate", participateRoutes);

const schoolRoutes = require("./routes/school");
app.use("/api/school", schoolRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

//เชื่อม
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view_admin", "login.html"));
});
app.get("/homepage_admin", (req, res) => {
  res.sendFile(path.join(__dirname, "view_admin", "homepage_admin.html"));
});

app.get("/InFormAdmin", (req, res) => {
  res.sendFile(path.join(__dirname, "view_admin", "InFormAdmin.html"));
});

app.get("/edit-info", (req, res) => {
  res.sendFile(path.join(__dirname, "view_admin", "edit-info.html"));
});

app.put("/api/school/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate the ID and data (you can add more validation as needed)
    if (!id || !updateData) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data or ID" });
    }

    // Update the school data
    const updatedSchool = await School.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedSchool) {
      return res
        .status(404)
        .json({ success: false, message: "School not found" });
    }

    res.json({ success: true, data: updatedSchool });
  } catch (error) {
    console.error("Error updating school:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating school data",
        details: error.message,
      });
  }
});

app.delete("/api/school/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await School.findByIdAndDelete(id);

    if (result) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "ไม่พบข้อมูล" }); // No data found
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.json({ success: false, message: "เกิดข้อผิดพลาดในการลบข้อมูล" }); // Error message
  }
});

const PORT = process.env.PORT || 30001;
app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT)
);
