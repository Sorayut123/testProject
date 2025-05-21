
// const express = require("express");
// const router = express.Router();
// const menuController = require("../controllers/menuController");
// const { upload, deleteOldImage }  = require("../middleware/upload");

// // อ่านข้อมูลเมนูทั้งหมด
// router.get("/", menuController.getAllMenus);

// // อ่านข้อมูลเมนูตาม ID
// router.get("/:id", menuController.getMenuById);

// // สร้างเมนูใหม่ (ไม่ต้องลบรูปภาพเก่า)
// router.post("/", upload.single("menu_image"), menuController.createMenu);


// // 📝 อัปเดตเมนู (ลบรูปเก่า + อัปโหลดใหม่)
// router.put("/:id", deleteOldImage, upload.single("menu_image"), menuController.updateMenu);
  


// router.delete("/:id", menuController.deleteMenu);




// module.exports = router;

const express = require("express");
const router = express.Router();
const menuController = require("../../controllers/owner/menuController");
const { uploadFoodImage, deleteOldFoodImage } = require("../../middleware/upload");

// อ่านข้อมูลเมนูทั้งหมด
router.get("/", menuController.getAllMenus);

// อ่านข้อมูลเมนูตาม ID
router.get("/:id", menuController.getMenuById);

// สร้างเมนูใหม่ (ไม่ต้องลบรูปภาพเก่า)
router.post("/", uploadFoodImage.single("menu_image"), menuController.createMenu);

// อัปเดตเมนู (ลบรูปเก่า + อัปโหลดใหม่)
router.put("/:id", deleteOldFoodImage, uploadFoodImage.single("menu_image"), menuController.updateMenu);

// ลบเมนู
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
