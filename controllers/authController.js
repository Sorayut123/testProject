const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('login', { message: null });
};

// exports.postLogin = async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findByUsername(username);

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.render('login', { message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }

//     req.session.user = { id: user.user_id, username: user.username, role: user.role };

//     if (user.role === 'owner') {
//         return res.redirect('/owner/dashboard');
//     } else {
//         return res.redirect('/staff/dashboard');
//     }
// };
exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);
        console.log("User found:", user);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        req.session.user = { id: user.user_id, username: user.username, role: user.role };

        if (user.role === 'owner') {
            return res.redirect('/owner/dashboard');
        } else {
            return res.redirect('/staff/dashboard');
        }
    } catch (err) {
        console.error("Login error:", err);
        res.render('login', { message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
