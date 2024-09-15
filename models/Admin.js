const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(//สร้างรูปแบบ Mongoose ใหม่ที่ชื่อuserSchem
    {
        email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
    },
    {timestamp : true, versionKey : false
        //timestamps: true:เพิ่มฟิลด์ลงในโครงร่างโดยอัตโนมัติcreatedAtซึ่งupdatedAtจะได้รับการอัพเดตโดย Mongoose โดยอัตโนมัติ
        //versionKey: false: ปิดการใช้งาน__vฟิลด์ซึ่งใช้ตามค่าเริ่มต้นเพื่อติดตามเวอร์ชันของเอกสาร 
    }
);
const Admin = mongoose.model('Admin',adminSchema)
//สร้างแบบจำลอง Mongoose ที่มีชื่อUsersตาม แบบuserSchemaจำลองนี้แสดงUsersคอลเลกชันใน MongoDB

module.exports = Admin;
//ส่งออกUsersโมเดลเพื่อให้สามารถใช้งานในส่วนอื่นๆ ของแอปพลิเคชัน เช่น ในตัวควบคุมหรือบริการ