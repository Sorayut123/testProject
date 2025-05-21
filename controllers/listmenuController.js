// const Menu = require("../models/menuModel");
const fs = require("fs");
const path = require("path");


const Menu = require("../models/listModel");


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