const db = require('../../config/db');

// เพิ่มโต๊ะใหม่ (ใช้ Promise)
exports.create = async (table_number, table_name, qrcode_image) => {
    const sql = 'INSERT INTO tables (table_number, table_name, qrcode_image) VALUES (?, ?, ?)';
    try {
        const [result] = await db.query(sql, [table_number, table_name, qrcode_image]);
        return result; // หรือถ้าคุณไม่ต้องการ result ก็ไม่ต้อง return
    } catch (err) {
        throw err;
    }
};
// ค้นหาข้อมูลโต๊ะตามหมายเลขโต๊ะ
exports.findByTableNumber = async (table_number) => {
    const sql = 'SELECT * FROM tables WHERE table_number = ?';
    try {
        const [rows] = await db.query(sql, [table_number]);
        return rows.length > 0 ? rows[0] : null; // ถ้ามีโต๊ะนี้อยู่ในฐานข้อมูลให้คืนค่า rows แรก
    } catch (err) {
        throw err;
    }
};

exports.findAll = async () => {
    const sql = 'SELECT * FROM tables ORDER BY table_id DESC';
    try {
        const [rows] = await db.query(sql); // ใช้ await เพื่อรอผลลัพธ์
        return rows;
    } catch (err) {
        throw err;
    }
};

// 🔸 ลบโต๊ะตาม ID
exports.deleteTable = async (id) => {
    await db.execute("DELETE FROM tables WHERE table_id = ?", [id]);
};

// 🔸 อัปเดตข้อมูลโต๊ะ (หมายเลข + ชื่อ) ตาม ID
// exports.update = (id, table_number, table_name, callback) => {
//     const sql = 'UPDATE tables SET table_number = ?, table_name = ? WHERE table_id = ?';
//     db.query(sql, [table_number, table_name, id], callback);
// };
// ดึงโต๊ะตาม ID
exports.getTableById = async (id) => {
    const [rows] = await db.execute("SELECT * FROM tables WHERE table_id = ?", [id]);
    return rows[0];
};
