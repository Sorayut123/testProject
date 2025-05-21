// const jwt = require('jsonwebtoken');

// exports.verifyToken = (req, res, next) => {
//     const token = req.cookies.token;
//     const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; // ใส่ secret key โดยตรง
    
//     if (!token) {
//         return res.redirect('/');
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey); // ใช้ secretKey แทน process.env.JWT_SECRET
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.redirect('/');
//     }
// };

// exports.checkRole = (role) => {
//     return (req, res, next) => {
//         if (req.user.role !== role) {
//             return res.status(403).send('Access denied');
//         }
//         next();
//     };
// };