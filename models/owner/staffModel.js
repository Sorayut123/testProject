const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const fs = require("fs");
const path = require('path'); // เพิ่มบรรทัดนี้เพื่อให้สามารถใช้ path ได้

module.exports = {
    getAllStaff: async () => {
        const [rows] = await db.execute("SELECT user_id, username,fname,lname, phone_number, user_image FROM users WHERE role='staff'");
        return rows;
    },

    addStaff: async (username, fname, lname, phone_number, password , user_image) => {
        try {
            // เข้ารหัสรหัสผ่านก่อนบันทึก
            const hashedPassword = await bcrypt.hash(password, 10); // 10 คือจำนวน salt rounds
            console.log("Hashed Password:", hashedPassword); // ตรวจสอบรหัสผ่านที่เข้ารหัสแล้ว
    
            const [result] = await db.execute(
                "INSERT INTO users (username, fname, lname, phone_number, password, user_image, role) VALUES (?, ?, ?, ?, ?, ?, 'staff')",
                [username, fname, lname, phone_number, hashedPassword , user_image]
            );
            return result;
        } catch (error) {
            console.error("Error in addStaff:", error); // แสดงข้อผิดพลาดในกรณีที่มีปัญหา
            throw error; // ขว้างข้อผิดพลาดออกไป
        }
    },
    
    
    getStaffById: async (id) => {
        const [rows] = await db.execute("SELECT user_id, username,fname,lname, phone_number ,password ,user_image FROM users WHERE user_id=?", [id]);
        return rows[0];
    },


    // updateStaff: async (id, username, fname, lname, phone_number, user_image) => {
    //     try {
    //         // ดึงข้อมูลรูปภาพเก่าจากฐานข้อมูล
    //         const [oldUser] = await db.query("SELECT user_image FROM users WHERE user_id = ?", [id]);
    //         if (!oldUser.length) {
    //             throw new Error("ไม่พบผู้ใช้งานที่ต้องการอัปเดต");
    //         }

    //         let newImage = oldUser[0].user_image; // ใช้รูปเก่าเป็นค่าเริ่มต้น

    //         // ถ้ามีการอัปโหลดรูปใหม่
    //         if (user_image) {
    //             newImage = user_image; // ใช้รูปใหม่

    //             // ลบรูปเก่า (ถ้ามี)
    //             const oldImagePath = path.join(__dirname, "../public/uploads/profile", oldUser[0].user_image);
    //             if (fs.existsSync(oldImagePath) && oldUser[0].user_image) {
    //                 fs.unlinkSync(oldImagePath);
    //                 console.log("✅ ลบรูปเก่าของผู้ใช้งานแล้ว:", oldUser[0].user_image);
    //             }
    //         }

    //         // อัปเดตข้อมูลในฐานข้อมูล
    //         const [result] = await db.execute(
    //             `UPDATE users 
    //             SET username = ?, fname = ?, lname = ?, phone_number = ?, user_image = ?
    //             WHERE user_id = ?`,
    //             [username, fname, lname, phone_number, newImage, id]
    //         );

    //         return result;
    //     } catch (error) {
    //         console.error("❌ Error updating staff:", error);
    //         throw error;
    //     }
    // },
    // updateStaff: async (id, data) => {
    //     try {
    //         // ดึงข้อมูลรูปภาพเก่า
    //         const [oldUser] = await db.execute("SELECT user_image FROM users WHERE user_id = ?", [id]);
    //         if (!oldUser.length) throw new Error("ไม่พบผู้ใช้งานที่ต้องการอัปเดต");
    
    //         let newImage = oldUser[0].user_image;
    
    //         // ถ้ามีรูปใหม่
    //         if (data.user_image) {
    //             newImage = data.user_image;
    
    //             const oldImagePath = path.join(__dirname, "../public/uploads/users", oldUser[0].user_image);
    //             try {
    //                 // ลบรูปเก่าแบบ asynchronous
    //                 await fs.unlink(oldImagePath);
    //                 console.log("✅ ลบรูปเก่าของ user แล้ว:", oldUser[0].user_image);
    //             } catch (err) {
    //                 console.error("❌ ไม่สามารถลบรูปเก่าได้:", err);
    //             }
    //         }
    
    //         // อัปเดตข้อมูล ยกเว้น password (ใช้ฟังก์ชัน resetPassword แยกต่างหาก)
    //         const [result] = await db.execute(
    //             "UPDATE users SET username = ?, fname = ?, lname = ?, phone_number = ?, user_image = ? WHERE user_id = ?",
    //             [data.username, data.fname, data.lname, data.phone_number, newImage, id]
    //         );
    
    //         return result;
    //     } catch (error) {
    //         console.error("❌ Error in updateStaff model:", error);
    //         throw error;
    //     }
    // },
  updateStaff :async (id, data) => {
    try {
        // ดึงข้อมูลรูปภาพเก่า
        const [oldUser] = await db.execute("SELECT user_image FROM users WHERE user_id = ?", [id]);
        if (!oldUser.length) throw new Error("ไม่พบผู้ใช้งานที่ต้องการอัปเดต");

        let newImage = oldUser[0].user_image;

        // ถ้ามีรูปใหม่
        if (data.user_image) {
            newImage = data.user_image;

            // ลบรูปเก่า
            const oldImagePath = path.join(__dirname, "../public/uploads/profile", oldUser[0].user_image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("❌ ไม่สามารถลบรูปเก่าได้:", err);
                    } else {
                        console.log("✅ ลบรูปเก่าของ user แล้ว:", oldUser[0].user_image);
                    }
                });
            }
        }

        // อัปเดตข้อมูล ยกเว้น password (ใช้ฟังก์ชัน resetPassword แยกต่างหาก)
        const [result] = await db.execute(
            "UPDATE users SET username = ?, fname = ?, lname = ?, phone_number = ?, user_image = ? WHERE user_id = ?",
            [data.username, data.fname, data.lname, data.phone_number, newImage, id]
        );

        return result;
    } catch (error) {
        console.error("❌ Error in updateStaff model:", error);
        throw error;
    }
},
 deleteUser: async (user_id) => {
    try {
        // ดึงข้อมูล user เพื่อหาชื่อไฟล์รูปภาพ
        const [userData] = await db.query("SELECT user_image FROM users WHERE user_id = ?", [user_id]);

        if (userData.length === 0) {
            throw new Error("ไม่พบผู้ใช้งานที่ต้องการลบ");
        }

        const imageFile = userData[0].user_image;
        if (imageFile) {
            const imagePath = path.join(__dirname, "../public/uploads/profile", imageFile); // <-- ปรับตรงนี้ให้ตรงกับตอน update

            try {
                fs.accessSync(imagePath, fs.constants.F_OK);
                fs.unlinkSync(imagePath);
                console.log("✅ ลบรูปภาพแล้ว:", imageFile);
            } catch (err) {
                console.warn("⚠️ ไม่พบไฟล์ภาพหรือไม่สามารถลบได้:", err.message);
            }
        }

        // ลบผู้ใช้ออกจากฐานข้อมูล
        const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [user_id]);
        return result;

    } catch (error) {
        console.error("❌ ลบผู้ใช้งานไม่สำเร็จ:", error.message);
        throw error;
    }
},

    // resetPassword: async (id, hashedPassword) => {
    //     const [result] = await db.execute('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, id]);
    //     return result;
    // }
    // ในฟังก์ชัน resetPassword ของ model
resetPassword: async (id, hashedPassword) => {
    try {
        const [result] = await db.execute('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, id]);

        // ตรวจสอบว่าอัปเดตสำเร็จหรือไม่
        if (result.affectedRows === 0) {
            throw new Error('ไม่พบผู้ใช้ที่ต้องการอัปเดตรหัสผ่าน');
        }
        
        console.log(`Password updated for user ID ${id}`);
        return result;
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
}


    
    
};
