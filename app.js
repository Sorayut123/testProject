const express = require('express');
const app = express();
const path = require('path');
// const mysql = require('mysql2');
// const multer = require('multer');
const cookieParser = require("cookie-parser");
const session = require('express-session');
// const dotenv = require("dotenv");

const menuRoutes = require('./routes/owner/menuRoutes'); 
const ownerRoutes = require('./routes/owner/ownerRoutes');
const categoryRoutes = require("./routes/owner/categoryRoutes"); // ใช้เส้นทางที่ถูกต้องตามที่คุณตั้งไว้
const tableRoutes = require("./routes/owner/tableRoutes"); // ใช้เส้นทางที่ถูกต้องตามที่คุณตั้งไว้
// const authRoutes = require("./routes/authRoutes"); // ใช้เส้นทางที่ถูกต้องตามที่คุณตั้งไว้
const staffRoutes = require('./routes/owner/staffRoutes');

// user ผู้ใช้งาทั่วไป
const listmenuRoutes = require("./routes/listmenuRoutes")

app.use(cookieParser());
app.set('views', path.join(__dirname, 'views')); // ✅ บอก Express ว่า views อยู่ที่ไหน
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); // ✅ ให้ Express ใช้ไฟล์ CSS, JS
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// ตั้งค่า middleware สำหรับ body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'e32737e0c48c60b468585cc554b98e5f0f9436fbb1b8c5dc435f8cac01c773a445db389faea431c755bfd4bb320350ba3afb0b5910423138ecefa7f2e2355c1f',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // ใช้ false ถ้าไม่ได้ใช้ HTTPS
}));

const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/owner/staffRoutes');
app.use(authRoutes);
// app.use(userRoutes);
// app.use('/', authRoutes);
app.use('/owner', ownerRoutes); // เส้นทางเจ้าของร้านเริ่มต้นด้วย /owner
// app.use('/', index); 
// app.use('/list_menu', listmenuRoutes); 
// เชื่อมโยง route
// app.use('/manageMenu', manageMenuRoutes);


app.use("/api/owner/manageMenu", menuRoutes);
app.use("/api/owner/category", categoryRoutes);
app.use('/api/owner/manageStaff', staffRoutes);
app.use('/api/owner/manageTable', tableRoutes);

// import routes
// import router
const indexRoutes = require('./routes/indexRoutes'); // << ต้องตรงกับไฟล์ที่อยู่

// user ผู้ใช้งาทั่วไป
app.use('/', indexRoutes);
app.use('/api/listmenu',listmenuRoutes)
// ใช้ Routes
// Routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);
const orderRoutes = require('./routes/orderRoutes')
app.use('/api/orders', orderRoutes);
// const menuRoutes = require('./routes/menuRoutes');
// app.use('/menu', menuRoutes);




app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
