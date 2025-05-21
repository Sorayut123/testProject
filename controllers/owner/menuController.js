// const Menu = require("../models/menuModel");
const fs = require("fs");
const path = require("path");


const Menu = require("../../models/owner/menuModel");


exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.getAllMenus();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.getMenuById(req.params.id);
        if (!menu) return res.status(404).json({ message: "Menu not found" });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createMenu = async (req, res) => {
    try {
        const { menu_name, price, special, detail_menu, menu_type_id } = req.body;
        const menu_image = req.file ? req.file.filename : null;
        await Menu.createMenu({ menu_name, price, special, detail_menu, menu_type_id, menu_image });
        res.status(201).json({ message: "Menu created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateMenu = async (req, res) => {
    try {
        const { menu_name, price, special, detail_menu, menu_type_id} = req.body;
        const menu_image = req.file ? req.file.filename : null;
        await Menu.updateMenu(req.params.id, { menu_name, price, special, detail_menu, menu_type_id, menu_image });
        res.json({ message: "Menu updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.deleteMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const result = await Menu.deleteMenu(menuId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "ไม่พบเมนูที่ต้องการลบ" });
        }

        res.json({ message: "✅ ลบเมนูเรียบร้อยแล้ว" });
    } catch (error) {
        res.status(500).json({ message: "❌ เกิดข้อผิดพลาดในการลบเมนู", error: error.message });
    }
};




