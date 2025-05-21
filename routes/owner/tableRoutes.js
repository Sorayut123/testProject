const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/owner/tableController');
const { uploadQrcodeImage } = require('../../middleware/upload');

// เพิ่มโต๊ะ + อัปโหลด QR code
router.post('/', uploadQrcodeImage.single('qrcode_image'), tableController.createTable);

// ดึงทั้งหมด
router.get('/', tableController.getAllTables);
router.get('/:id', tableController.getTableById);


// ลบ
router.delete('/:id', tableController.deleteTable);

// อัปเดตชื่อโต๊ะ/หมายเลขโต๊ะ
// router.put('/:id', tableController.updateTable);

module.exports = router;
