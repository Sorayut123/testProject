const express = require('express');
const router = express.Router();
const staffController = require('../../controllers/owner/staffController'); // ตรวจสอบว่าไฟล์นี้มีอยู่จริง
const { uploadUserImage, deleteOldUserImage } = require("../../middleware/upload");
// สำหรับการรีเซ็ตรหัสผ่าน
router.put('/reset-password/:id', staffController.resetPassword);

router.get('/', staffController.getAllStaff);
router.post('/',uploadUserImage.single("user_image"), staffController.addStaff);
router.get('/:id', staffController.getStaffById);
router.put('/:id',deleteOldUserImage,uploadUserImage.single("user_image"), staffController.updateStaff);
router.delete('/:id', staffController.deleteUser);


module.exports = router;
