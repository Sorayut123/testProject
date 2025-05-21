const tableModel = require('../../models/owner/tableModel');
const QRCode = require('qrcode');  // นำเข้าไลบรารี QRCode
const fs = require('fs').promises;
const path = require('path');
const { ensureDir ,uploadQrcodeImage } = require('../../middleware/upload'); // ถ้าแยกไว้ใน upload.js แล้ว export ไว้



exports.createTable = async (req, res) => {
    const { table_number, table_name } = req.body;
    const tableUrl = `http://localhost:3000/menu/table/${table_number}`; // ปรับ URL ตามจริง

    const fileName = `table_${table_number}.png`;
    const qrPath = path.join(__dirname, '../../public/uploads/qrcode', fileName); // ใช้ path ที่กำหนดใน public/uploads/qrcode
    const qrcodeImage = `${fileName}`; // path สำหรับบันทึกใน DB

    try {
        // ตรวจสอบและสร้างโฟลเดอร์ถ้ายังไม่มี
        await ensureDir(path.join(__dirname, '../../public/uploads/qrcode'));

        // ตรวจสอบว่าโต๊ะนั้นมีอยู่แล้วหรือไม่
        const existingTable = await tableModel.findByTableNumber(table_number);
        if (existingTable) {
            return res.status(400).json({ message: '❌ โต๊ะนี้มีอยู่แล้วในระบบ' });
        }

        // สร้าง QR Code แล้วเซฟลงไฟล์
        await QRCode.toFile(qrPath, tableUrl, {
            errorCorrectionLevel: 'H',
            type: 'png',
            width: 300,
        });

        // เพิ่มข้อมูลโต๊ะลงในฐานข้อมูล
        await tableModel.create(table_number, table_name, qrcodeImage);
        res.status(201).json({ message: '✅ เพิ่มโต๊ะเรียบร้อยแล้ว' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '❌ เกิดข้อผิดพลาดในการเพิ่มโต๊ะ' });
    }
};



// ฟังก์ชันดึงข้อมูลโต๊ะทั้งหมด
exports.getAllTables = async (req, res) => {
    try {
        const tables = await tableModel.findAll();
        res.json(tables); // ส่งข้อมูลโต๊ะทั้งหมดไปยัง client
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูลโต๊ะ');
    }
};
// ดึงโต๊ะตาม ID
exports.getTableById = async (req, res) => {
    try {
        const id = req.params.id;
        const table = await tableModel.getTableById(id);

        if (!table) {
            return res.status(404).json({ message: 'ไม่พบโต๊ะ' });
        }

        res.json(table);
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
    }
};

// ลบโต๊ะ
exports.deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        await tableModel.deleteTable(id);
        res.json({ message: "ลบโต๊ะเรียบร้อยแล้ว" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบโต๊ะ" });
    }
};

// แก้ไขโต๊ะ
// exports.updateTable = (req, res) => {
//     const id = req.params.id;
//     const { table_number, table_name } = req.body;

//     tableModel.update(id, table_number, table_name, (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'อัปเดตโต๊ะไม่สำเร็จ' });
//         }
//         res.json({ message: 'อัปเดตโต๊ะเรียบร้อย' });
//     });
// };
