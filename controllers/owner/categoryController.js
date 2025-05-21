

// module.exports = categoryController;
const categoryModel = require("../../models/owner/categoryModel");

// ดึงข้อมูลหมวดหมู่ทั้งหมด
const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูล", error });
    }
};
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;  // รับ id จาก URL parameters

        // เรียกใช้ model เพื่อดึงข้อมูลหมวดหมู่ตาม id
        const category = await categoryModel.getCategoryById(id);

        // ตรวจสอบว่ามีข้อมูลหมวดหมู่ที่ตรงกับ id หรือไม่
        if (!category) {
            return res.status(404).json({ success: false, message: "ไม่พบหมวดหมู่" });
        }

        // ส่งข้อมูลกลับไป
        res.json({ success: true, data: category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error });
    }
};

// เพิ่มหมวดหมู่ใหม่
const addCategory = async (req, res) => {
    const { type_name } = req.body;
    if (!type_name) {
        return res.status(400).json({ success: false, message: "กรุณาระบุชื่อหมวดหมู่" });
    }
    try {
        const insertId = await categoryModel.addCategory(type_name);
        res.json({ success: true, message: "เพิ่มหมวดหมู่สำเร็จ", insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "ไม่สามารถเพิ่มหมวดหมู่ได้", error });
    }
};

// แก้ไขหมวดหมู่
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { type_name } = req.body;
    if (!type_name) {
        return res.status(400).json({ success: false, message: "กรุณาระบุชื่อหมวดหมู่" });
    }
    try {
        await categoryModel.updateCategory(id, type_name);
        res.json({ success: true, message: "แก้ไขหมวดหมู่สำเร็จ" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "ไม่สามารถแก้ไขข้อมูลได้", error });
    }
};

// ลบหมวดหมู่
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await categoryModel.deleteCategory(id);
        res.json({ success: true, message: "ลบหมวดหมู่สำเร็จ" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "ไม่สามารถลบข้อมูลได้", error });
    }
};


module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
};

