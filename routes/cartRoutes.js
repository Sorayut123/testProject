// // routes/cartRoutes.js
// const express = require('express');
// const router = express.Router();
// const db = require('../config/db');

// // เพิ่มเมนูลงตะกร้า
// router.post('/add', async (req, res) => {
//   try {
//     const menuId = req.body.menu_id;
    
//     // ดึงข้อมูลเมนูจากฐานข้อมูล
//     const [results] = await db.query('SELECT * FROM menu WHERE menu_id = ?', [menuId]);
    
//     if (results.length === 0) {
//       return res.status(404).send('เมนูไม่พบ');
//     }
    
//     const item = results[0];

//     if (!req.session.cart) {
//       req.session.cart = [];
//     }

//     // เช็คว่าเมนูนี้อยู่ในตะกร้าหรือยัง
//     const existing = req.session.cart.find(i => i.menu_id === item.menu_id);

//     if (existing) {
//       existing.quantity += 1;
//     } else {
//       req.session.cart.push({
//         menu_id: item.menu_id,
//         menu_name: item.menu_name,
//         price: item.price,
//         menu_image: item.menu_image,
//         quantity: 1
//       });
//     }

//     console.log('Cart after adding item:', req.session.cart);  // เช็คค่าส่งออก

//     // รีไดเร็กไปที่หน้า /cart
//     res.redirect('/cart');
//   } catch (err) {
//     console.error('Error occurred:', err);
//     // ส่งข้อผิดพลาดไปยังหน้าแสดงผล
//     res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มเมนูลงในตะกร้า');
//   }
// });

// // แสดงหน้าตะกร้า
// router.get('/', (req, res) => {
//   try {
//     const cart = req.session.cart || [];
//     res.render('cart', { cart });
//   } catch (err) {
//     console.error('Error occurred:', err);
//     res.status(500).send('เกิดข้อผิดพลาดในการโหลดตะกร้า');
//   }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const cartController = require('../controllers/cartController');

// // เพิ่มเมนูลงตะกร้า
// // เดิม: /add → ไม่เหมาะกับ REST
// // ใหม่: /cart (ตาม RESTful API)
// router.post('/cart', cartController.addToCart);

// // ลบเมนูออกจากตะกร้า
// // router.post('/remove', cartController.removeFromCart);

// // อัปเดตจำนวนในตะกร้า
// // router.post('/update', cartController.updateQuantity);

// // ล้างตะกร้า
// // router.post('/clear', cartController.clearCart);

// // แสดงหน้าตะกร้า
// router.get('/', cartController.viewCart);
// module.exports = router;
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// router.post('/add', cartController.addToCart);
// router.post('/cart/table/:table_number/add', cartController.addToCart);

// router.post('/cart/table/:table_number/add', cartController.addToCart);
// router.get('/cart/table/:table_number/view', cartController.viewCart);
// router.post('/cart/table/:table_number/update', cartController.updateCartItem);
// router.delete('/cart/table/:table_number/remove/:menu_id', cartController.removeFromCart);
// router.delete('/cart/table/:table_number/clear', cartController.clearCart);
// router.get('/cart/table/:table_number/count', cartController.getCartCount);
router.post('/table/:table_number/add', cartController.addToCart);
router.get('/table/:table_number/view', cartController.viewCart);
router.put('/table/:table_number/update', cartController.updateCartItem);
router.delete('/table/:table_number/remove/:menu_id', cartController.removeFromCart);
router.delete('/table/:table_number/clear', cartController.clearCart);
router.get('/table/:table_number/count', cartController.getCartCount);

// router.get('/', cartController.viewCart);
// router.put('/update', cartController.updateCartItem);      // อัปเดตจำนวนเมนู
// router.delete('/remove/:menu_id', cartController.removeFromCart); // ลบเมนู
// router.delete('/clear', cartController.clearCart);
// router.get('/count', cartController.getCartCount);

module.exports = router;
