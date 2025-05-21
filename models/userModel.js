const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }


    static async getAllStaff() {
        const [rows] = await db.query('SELECT user_id, username, phone_number, role FROM users WHERE role = "staff"');
        return rows;
    }

    static async deleteUser(user_id) {
        await db.query('DELETE FROM users WHERE user_id = ?', [user_id]);
    }
}

module.exports = User;
