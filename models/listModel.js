

const db = require("../config/db");
const path = require("path");
const fs = require("fs");

class ListMenu {
    // static async getAllMenus() {
    //     const [rows] = await db.query("SELECT * FROM menu");
    //  
    //    return rows;
    // }
    
    
    static async getAllMenus() {
        const [rows] = await db.query(`
            SELECT menu.*, COALESCE(menu_type.type_name, 'ไม่ระบุประเภท') AS type_name
            FROM menu
            LEFT JOIN menu_type ON menu.menu_type_id = menu_type.menu_type_id
        `);
        return rows;
    }

    static async getMenuById(menu_id) {
        const [rows] = await db.query(`
            SELECT menu.*, COALESCE(menu_type.type_name, 'ไม่ระบุประเภท') AS type_name
            FROM menu
            LEFT JOIN menu_type ON menu.menu_type_id = menu_type.menu_type_id
            WHERE menu.menu_id = ?
        `, [menu_id]);
        return rows[0];
    }
    

   



    
}

module.exports = ListMenu;
