


// module.exports = { upload, deleteOldImage };
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// ฟังก์ชันสร้างโฟลเดอร์ถ้ายังไม่มี
async function ensureDir(dirPath) {
    try {
        await fs.access(dirPath);
    } catch (err) {
        console.log(`📂 Directory ${dirPath} not found. Creating...`);
        await fs.mkdir(dirPath, { recursive: true });
    }
}

// ฟังก์ชันสร้าง multer storage โดยรับ path เป็นพารามิเตอร์
function createMulterStorage(uploadPath) {
    return multer.diskStorage({
        destination: async (req, file, cb) => {
            await ensureDir(uploadPath);
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const newFileName = Date.now() + path.extname(file.originalname);
            cb(null, newFileName);
        }
    });
}

// ตัวกรองประเภทไฟล์
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("❌ Invalid file type. Only JPG, PNG, and GIF are allowed."), false);
    }
};

// ฟังก์ชันสร้าง middleware upload สำหรับโฟลเดอร์ที่กำหนด
function createUploader(folderName) {
    const uploadPath = path.resolve(__dirname, `../public/uploads/${folderName}`);
    const storage = createMulterStorage(uploadPath);
    return multer({
        storage,
        fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 } // 2MB
    });
}

// ลบไฟล์รูปเก่า
function deleteOldImage(folderName) {
    return async (req, res, next) => {
        const oldImage = req.body.oldImage;
        if (oldImage) {
            const oldImagePath = path.join(__dirname, `../public/uploads/${folderName}`, oldImage);
            try {
                await fs.access(oldImagePath);
                await fs.unlink(oldImagePath);
                console.log("✅ Old image deleted successfully");
            } catch (err) {
                console.warn("⚠️ Old image not found or could not be deleted:", err.message);
            }
        }
        next();
    };
}

module.exports = {
    uploadFoodImage: createUploader("food"),
    uploadUserImage: createUploader("profile"),
    uploadQrcodeImage: createUploader("qrcodes"),
    deleteOldFoodImage: deleteOldImage("food"),
    deleteOldUserImage: deleteOldImage("profile"),
    deleteOldQrcodeImage: deleteOldImage("qrcodes"),
    ensureDir 
};
