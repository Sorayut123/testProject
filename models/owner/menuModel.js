

const db = require("../../config/db");
const path = require("path");
const fs = require("fs");

class Menu {
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
    
    // static async getMenuById(menu_id) {
    //     const [rows] = await db.query("SELECT * FROM menu WHERE menu_id = ?", [menu_id]);
    //     return rows[0];
    // }
    static async getMenuById(menu_id) {
        const [rows] = await db.query(`
            SELECT menu.*, COALESCE(menu_type.type_name, 'ไม่ระบุประเภท') AS type_name
            FROM menu
            LEFT JOIN menu_type ON menu.menu_type_id = menu_type.menu_type_id
            WHERE menu.menu_id = ?
        `, [menu_id]);
        return rows[0];
    }
    
    // static async createMenu(menuData) {
    //     const { menu_name, price, special, detail_menu, menu_type_id, menu_image } = menuData;
    //     const [result] = await db.query(
    //         "INSERT INTO menu (menu_name, price, special, detail_menu, menu_type_id, menu_image) VALUES (?, ?, ?, ?, ?, ?)",
    //         [menu_name, price, special, detail_menu, menu_type_id, menu_image]
    //     );
    //     return result;
    // }
    static async createMenu(menuData) {
        try {
            const { menu_name, price, special, detail_menu, menu_type_id, menu_image } = menuData;
    
            console.log("🔹 Data received:", menuData); // ตรวจสอบข้อมูลที่ได้รับ
    
            const [result] = await db.query(
                "INSERT INTO menu (menu_name, price, special, detail_menu, menu_type_id, menu_image) VALUES (?, ?, ?, ?, ?, ?)",
                [menu_name, price, special, detail_menu, menu_type_id, menu_image]
            );
    
            console.log("✅ Menu created:", result);
            return result;
        } catch (error) {
            console.error("❌ Error saving menu:", error.message);
            throw error;
        }
    }

    static async updateMenu(menu_id, menuData) {
        try {
            const { menu_name, price, special, detail_menu, menu_type_id, menu_image } = menuData;
    
            // ตรวจสอบว่า menu_type_id เป็นค่า valid
            if (!menu_type_id) {
                throw new Error("กรุณาเลือกหมวดหมู่");
            }
    
            // ดึงข้อมูลรูปภาพเก่าจากฐานข้อมูล
            const [oldMenu] = await db.query("SELECT menu_image FROM menu WHERE menu_id = ?", [menu_id]);
            if (!oldMenu.length) {
                throw new Error("ไม่พบเมนูที่ต้องการอัปเดต");
            }
    
            let newImage = oldMenu[0].menu_image; // ใช้รูปเก่าเป็นค่าเริ่มต้น
    
            // ถ้ามีการอัปโหลดรูปใหม่
            if (menu_image) {
                newImage = menu_image; // ใช้รูปใหม่
    
                // ลบรูปเก่า (ต้องไม่ใช่ค่าว่าง)
                const oldImagePath = path.join(__dirname, "../public/uploads/food", oldMenu[0].menu_image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log("✅ ลบรูปเก่าแล้ว:", oldMenu[0].menu_image);
                }
            }
    
            // อัปเดตข้อมูลในฐานข้อมูล
            const [result] = await db.query(
                `UPDATE menu 
                 SET menu_name = ?, price = ?, special = ?, detail_menu = ?, menu_type_id = ?, menu_image = ?
                 WHERE menu_id = ?`,
                [menu_name, price, special, detail_menu, menu_type_id, newImage, menu_id]
            );
    
            return result;
        } catch (error) {
            console.error("❌ Error updating menu:", error);
            throw error;
        }
    }
    



    static async deleteMenu(menu_id) {
        try {
            // ดึงข้อมูลเมนูเพื่อหาชื่อไฟล์รูปภาพก่อนลบ
            const [menuData] = await db.query("SELECT menu_image FROM menu WHERE menu_id = ?", [menu_id]);

            if (menuData.length === 0) {
                throw new Error("ไม่พบเมนูที่ต้องการลบ");
            }

            const imageFile = menuData[0].menu_image;
            if (imageFile) {
                const imagePath = path.join(__dirname, "../public/uploads/food", imageFile);
                
                // ตรวจสอบว่าไฟล์มีอยู่จริง แล้วทำการลบ
                try {
                    fs.accessSync(imagePath, fs.constants.F_OK);
                    fs.unlinkSync(imagePath);
                    console.log("✅ Deleted image:", imageFile);
                } catch (err) {
                    console.warn("⚠️ Image file not found or cannot be deleted:", err.message);
                }
            }

            // ลบข้อมูลเมนูจากฐานข้อมูล
            const [result] = await db.query("DELETE FROM menu WHERE menu_id = ?", [menu_id]);
            return result;

        } catch (error) {
            console.error("❌ Error deleting menu:", error.message);
            throw error; // ส่ง error กลับไปให้ controller จัดการ
        }
    }





    
}

module.exports = Menu;
