const bcrypt = require('bcryptjs');
const Staff = require("../../models/owner/staffModel");

exports.getAllStaff = async (req, res) => {
    try {
        const staffList = await Staff.getAllStaff();
        res.json(staffList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.addStaff = async (req, res) => {
    try {
        const { username, fname, lname, phone_number, password } = req.body;
        const user_image = req.file ? req.file.filename : null;
        console.log("Payload received:", req.body);

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashedPassword);

        // ✅ แก้ลำดับ parameter ให้ตรงกับ model
        const result = await Staff.addStaff(username, fname, lname, phone_number, hashedPassword, user_image);
        console.log("Result from DB:", result);

        res.json({ message: "Staff added successfully", staffId: result.insertId });
    } catch (error) {
        console.error("Error in addStaff:", error);
        res.status(500).json({ error: error.message });
    }
};
// ฟังก์ชันรีเซ็ตรหัสผ่าน

exports.resetPassword = async (req, res) => {
    const staffId = req.params.id;
    const { password } = req.body;

    if (!staffId || !password) {
        return res.status(400).json({ message: 'Missing staffId or password' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await Staff.resetPassword(staffId, hashedPassword);

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: 'Staff not found or password not updated' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Error resetting password" });
    }
};




exports.getStaffById = async (req, res) => {
    try {
        const staff = await Staff.getStaffById(req.params.id);
        if (staff) {
            res.json(staff);
        } else {
            res.status(404).json({ error: "Staff not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.updateStaff = async (req, res) => {
//     try {
//         const { username,fname,lname, phone_number, password } = req.body;
//         await Staff.updateStaff(req.params.id, username,fname,lname, phone_number, password);
//         res.json({ message: "Staff updated successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// exports.updateStaff = async (req, res) => {
//     try {
//         const { username, fname, lname, phone_number, password } = req.body;

//         // เข้ารหัสรหัสผ่านใหม่ (ในกรณีที่มีการเปลี่ยน)
//         const hashedPassword = await bcrypt.hash(password, 10);

//         await Staff.updateStaff(req.params.id, username, fname, lname, phone_number, hashedPassword);
//         res.json({ message: "Staff updated successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
exports.updateStaff = async (req, res) => {
    try {
        const { username, fname, lname, phone_number } = req.body;
        const user_image = req.file ? req.file.filename : null;

        await Staff.updateStaff(req.params.id, { username, fname, lname, phone_number, user_image });

        res.json({ message: "อัปเดตข้อมูลพนักงานสำเร็จ" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// exports.deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const result = await Menu.deleteMenu(userId);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "ไม่พบเมนูที่ต้องการลบ" });
//         }

//         res.json({ message: "✅ ลบเมนูเรียบร้อยแล้ว" });
//     } catch (error) {
//         res.status(500).json({ message: "❌ เกิดข้อผิดพลาดในการลบเมนู", error: error.message });
//     }
// };
// exports.deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id;

//         const result = await User.deleteUser(userId); // เรียกใช้ model

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "❌ ไม่พบผู้ใช้งานที่ต้องการลบ" });
//         }

//         res.json({ message: "✅ ลบผู้ใช้งานเรียบร้อยแล้ว" });
//     } catch (error) {
//         res.status(500).json({
//             message: "❌ เกิดข้อผิดพลาดในการลบผู้ใช้งาน",
//             error: error.message
//         });
//     }
// };
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // ดึง ID จาก URL parameter
        const result = await Staff.deleteUser(userId); // ฟังก์ชันลบข้อมูลใน model

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ไม่พบผู้ใช้งานที่ต้องการลบ" });
        }

        res.json({ message: "ลบผู้ใช้งานเรียบร้อย" });
    } catch (error) {
        console.error("Error in deleteUser:", error.message); // Log error
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบผู้ใช้งาน", error: error.message });
    }
};
