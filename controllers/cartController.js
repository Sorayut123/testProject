const cartModel = require('../models/cartModel');
const { addToCart,getCart } = require('../models/cartModel'); // ต้องอ้างอิงให้ตรงชื่อไฟล์และฟังก์ชัน
// exports.addToCart = async (req, res) => {
//   try {
//     const { menu_id, quantity } = req.body;
//     if (!menu_id || !quantity) {
//       return res.status(400).json({ error: "กรุณาระบุ menu_id และ quantity" });
//     }

//     const updatedCart = await cartModel.addToCart(req.session, menu_id, quantity);
//     res.json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.addToCart = async (req, res) => {
//   try {
//     const { menu_id, quantity } = req.body;
//     const tableNumber = req.params.table_number;

//     if (!menu_id || !quantity || !tableNumber) {
//       return res.status(400).json({ error: "กรุณาระบุ menu_id, quantity และ table_number" });
//     }

//     const updatedCart = await cartModel.addToCart(req.session, menu_id, quantity, tableNumber);
//     res.json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.addToCart = async (req, res) => {
//   try {
//     const tableNumber = req.params.table_number;
//     const { menu_id, quantity } = req.body;

//     if (!tableNumber) {
//       return res.status(400).json({ error: "ไม่พบเลขโต๊ะ" });
//     }
//     if (!menu_id || !quantity) {
//       return res.status(400).json({ error: "ข้อมูลเมนูหรือจำนวนไม่ครบ" });
//     }

//     // ตัวอย่างโค้ดเพิ่มเมนูลงตะกร้า (ปรับตามโครงสร้างของคุณ)
//     // สมมติมีฟังก์ชัน addItemToCart(tableNumber, menu_id, quantity)
//     const result = await addItemToCart(tableNumber, menu_id, quantity);

//     res.status(200).json({ message: "เพิ่มลงตะกร้าเรียบร้อย", data: result });

//   } catch (error) {
//     console.error("Error in addToCart:", error);
//     res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
//   }
// };
// สมมติฟังก์ชันนี้อยู่ในไฟล์เดียวกัน
exports.addToCart = async (req, res) => {
  try {
    const tableNumber = req.params.table_number;
    const { menu_id, quantity } = req.body;

    if (!tableNumber || !menu_id || !quantity) {
      return res.status(400).json({ error: "ข้อมูลไม่ครบ" });
    }

    const cart = await addToCart(req.session, tableNumber, menu_id, quantity);

    res.status(200).json({
      message: "เพิ่มรายการลงตะกร้าสำเร็จ",
      data: cart
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};



// exports.viewCart = (req, res) => {
//   console.log(req.session.cart); // เพิ่มบรรทัดนี้เพื่อเช็ค session.cart
//   try {
//       const cart = cartModel.getCart(req.session);
//       console.log(cart);  
//       res.json(cart);
//   } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการโหลดตะกร้า:", error);
//       res.status(500).json({ message: "เกิดข้อผิดพลาดในการโหลดตะกร้า" });
//   }
// };
// exports.viewCart = (req, res) => {
//   const tableNumber = req.params.table_number;

//   try {
//     const cart = cartModel.getCart(req.session, tableNumber);
//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในการโหลดตะกร้า" });
//   }
// };
// exports.viewCart = (req, res) => {
//   const tableNumber = req.params.table_number;

//   // ตรวจสอบว่า session มี cart และมีข้อมูลของโต๊ะนี้
//   const cart = req.session.cart && req.session.cart[tableNumber];

//   if (!cart || cart.length === 0) {
//     return res.status(404).json({ message: "ไม่พบรายการในตะกร้า" });
//   }

//   res.status(200).json({
//     table: tableNumber,
//     items: cart
//   });
// };
// exports.viewCart = (req, res) => {
//   const tableNumber = req.params.table_number;
//   console.log("session.cart:", req.session.cart); // ✅ ตรวจสอบว่ามีอะไรใน session

//   const cart = req.session.cart && req.session.cart[tableNumber];

//   if (!cart || cart.length === 0) {
//     return res.status(404).json({ message: "ไม่พบรายการในตะกร้า" });
//   }

//   res.status(200).json({
//     table: tableNumber,
//     items: cart
//   });
// };

exports.viewCart = async (req, res) => {
  const tableNumber = req.params.table_number;
  const cart = req.session.cart && req.session.cart[tableNumber];

  if (!cart) {
    return res.status(200).json([]);
  }

  res.status(200).json(cart);  // ส่ง array ตรง ๆ ไปเลย
};


// exports.updateCartItem = (req, res) => {
//   try {
//     const { menu_id, quantity } = req.body;

//     console.log("ค่าที่รับมา:", menu_id, quantity);
//     console.log("session:", req.session);

//     if (!menu_id || quantity === undefined) {
//       return res.status(400).json({ error: "กรุณาระบุ menu_id และ quantity" });
//     }

//     const updatedCart = cartModel.updateCartItem(req.session, menu_id, quantity);
//     res.json(updatedCart);
//   } catch (error) {
//     console.error("เกิด error ใน updateCartItem:", error.message);
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตรายการ" });
//   }
// };
exports.updateCartItem = (req, res) => {
  const { menu_id, quantity } = req.body;
  const tableNumber = req.params.table_number;

  try {
    const updatedCart = cartModel.updateCartItem(req.session, tableNumber, menu_id, quantity); // ✅ แก้ตรงนี้
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตรายการ" });
  }
};



// exports.getCartCount = (req, res) => {
//   const cart = req.session.cart || [];
//   const count = cart.reduce((sum, item) => sum + item.quantity, 0); // นับตามจำนวนรวม
//   res.json({ count });
// };
exports.getCartCount = (req, res) => {
  const tableNumber = req.params.table_number;
  const cart = (req.session.cartByTable && req.session.cartByTable[tableNumber]) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ count });
};


// exports.removeFromCart = (req, res) => {
//   try {
//     const { menu_id } = req.params;
//     if (!menu_id) {
//       return res.status(400).json({ error: "กรุณาระบุ menu_id" });
//     }

//     const updatedCart = cartModel.removeFromCart(req.session, menu_id);
//     res.json(updatedCart);
//   } catch (error) {
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบรายการ" });
//   }
// };
exports.removeFromCart = (req, res) => {
  try {
    const { table_number, menu_id } = req.params;  // รับทั้งสองจาก params

    if (!table_number) {
      return res.status(400).json({ error: "กรุณาระบุ table_number" });
    }
    if (!menu_id) {
      return res.status(400).json({ error: "กรุณาระบุ menu_id" });
    }

    const updatedCart = cartModel.removeFromCart(req.session, table_number, menu_id);
    res.json(updatedCart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบรายการ" });
  }
};




// exports.clearCart = (req, res) => {
//   try {
//     req.session.cart = []; // เคลียร์ตะกร้า
//     res.json({ message: "ล้างตะกร้าเรียบร้อยแล้ว" });
//   } catch (error) {
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในการล้างตะกร้า" });
//   }
// };
// exports.clearCart = (req, res) => {
//   const tableNumber = req.params.table_number;

//   try {
//     if (req.session.cartByTable && req.session.cartByTable[tableNumber]) {
//       req.session.cartByTable[tableNumber] = [];
//     }
//     res.json({ message: "ล้างตะกร้าเรียบร้อยแล้ว" });
//   } catch (error) {
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในการล้างตะกร้า" });
//   }
// };
exports.clearCart = (req, res) => {
  const tableNumber = req.params.table_number;

  try {
    const clearedCart = cartModel.clearCart(req.session, tableNumber);
    res.json({ message: "ล้างตะกร้าเรียบร้อย", cart: clearedCart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการล้างตะกร้า" });
  }
};
