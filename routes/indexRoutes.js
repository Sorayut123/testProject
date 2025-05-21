const express = require('express');
const router = express.Router();

// เข้าหน้าแรก
// router.get('/', (req, res) => {
//     res.redirect('/menu'); // เข้า root (/) แล้วพาไปที่ /menu
// });
// เมนูตามโต๊ะ
router.get('/menu/table/:table_number', (req, res) => {
    const tableNumber = req.params.table_number;
    res.render('pages/menu', { tableNumber }); // 👈 เปลี่ยนจาก menu_by_table เป็น menu
});

// เข้าหน้าเมนู
// router.get('/menu', (req, res) => {
//     res.render('pages/menu'); // ต้องตรงกับ views/pages/menu.ejs
// });

// หน้าต่าง ๆ เพิ่มเติม
router.get('/menu/table/:table_number', (req, res) => {
  const tableNumber = req.params.table_number;
  // ดึงเมนูจาก DB หรือจัดการข้อมูลที่ต้องการ
  res.render('pages/menu', { tableNumber });
});

router.get('/cart/table/:table_number', (req, res) => {
  const tableNumber = req.params.table_number;
  // ดึงข้อมูลตะกร้าของโต๊ะนี้
  res.render('pages/cart', { tableNumber });
});

router.get('/orders/table/:table_number', (req, res) => {
  const tableNumber = req.params.table_number;
  res.render('pages/orders', { tableNumber });
});

// router.get('/cart', (req, res) => {
//     res.render('pages/cart');
// });

// router.get('/orders', (req, res) => {
//     res.render('pages/orders');
// });

// router.get('/contact', (req, res) => {
//     res.render('pages/contact');
// });

module.exports = router;
