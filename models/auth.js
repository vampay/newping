const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        course: { type: String, required: true },
        role: { 
            type: String, 
            enum: ['user', 'admin'],  // กำหนดค่าให้เป็น 'user' หรือ 'admin'
            default: 'user'           // ค่าเริ่มต้นเป็น 'user'
        }
    },
    {
        timestamps: true,   // สร้าง createdAt และ updatedAt อัตโนมัติ
        versionKey: false    // ปิดใช้งานฟิลด์ __v ที่ติดตามเวอร์ชันเอกสาร
    }
);

const User = mongoose.model('auth', userSchema);

module.exports = User;
