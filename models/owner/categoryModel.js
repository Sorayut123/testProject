
// module.exports = Menu;
const db = require("../../config/db"); // เชื่อมต่อกับฐานข้อมูล

// ดึงข้อมูลหมวดหมู่ทั้งหมด
const getAllCategories = async () => {
    const [rows] = await db.query("SELECT * FROM menu_type");
    return rows;
};
// ดึงข้อมูลหมวดหมู่ที่เจาะจงตาม menu_type_id
const getCategoryById = async (menu_type_id) => {
    const [rows] = await db.query("SELECT * FROM menu_type WHERE menu_type_id = ?", [menu_type_id]);
    return rows;
};

// เพิ่มหมวดหมู่ใหม่
const addCategory = async (type_name) => {
    const [result] = await db.query("INSERT INTO menu_type (type_name) VALUES (?)", [type_name]);
    return result.insertId;
};

// แก้ไขหมวดหมู่
const updateCategory = async (id, type_name) => {
    await db.query("UPDATE menu_type SET type_name = ? WHERE menu_type_id = ?", [type_name, id]);
};

// ลบหมวดหมู่
const deleteCategory = async (id) => {
    await db.query("DELETE FROM menu_type WHERE menu_type_id = ?", [id]);
};

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
};
