// models/cartModel.js
const db = require("../config/db");

// exports.addToCart = async (session, menu_id, quantity = 1) => {
//     const [results] = await db.query("SELECT * FROM menu WHERE menu_id = ?", [menu_id]);
  
//     if (results.length === 0) {
//       throw new Error("ไม่พบเมนู");
//     }
  
//     const item = results[0];
  
//     if (!session.cart) {
//       session.cart = [];
//     }
  
//     const existingItem = session.cart.find(i => i.menu_id === item.menu_id);
  
//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       session.cart.push({
//         menu_id: item.menu_id,
//         menu_name: item.menu_name,
//         price: item.price,
//         menu_image: item.menu_image,
//         quantity: quantity
//       });
//     }
  
//     return session.cart;
//   };
exports.addToCart = async (session, table_number, menu_id, quantity = 1) => {
  // แปลง quantity เป็นจำนวนเต็มและตรวจสอบ
  quantity = parseInt(quantity);
  if (isNaN(quantity) || quantity < 1) {
    throw new Error("จำนวนสินค้าต้องเป็นจำนวนเต็มบวก");
  }

  // ดึงข้อมูลเมนูจากฐานข้อมูล
  const [results] = await db.query("SELECT * FROM menu WHERE menu_id = ?", [menu_id]);
  if (results.length === 0) {
    throw new Error("ไม่พบเมนู");
  }

  const item = results[0];

  // สร้าง object cart ใน session ถ้ายังไม่มี
  if (!session.cart) {
    session.cart = {};
  }

  // สร้าง array สำหรับโต๊ะนั้น ๆ ถ้ายังไม่มี
  if (!session.cart[table_number]) {
    session.cart[table_number] = [];
  }

  // ตรวจสอบว่ามีเมนูนี้อยู่แล้วในโต๊ะนี้หรือไม่
  const existingItem = session.cart[table_number].find(i => i.menu_id === item.menu_id);

  if (existingItem) {
    // ถ้ามีอยู่แล้วเพิ่มจำนวน
    existingItem.quantity += quantity;
  } else {
    // ถ้ายังไม่มีเพิ่มรายการใหม่
    session.cart[table_number].push({
      menu_id: item.menu_id,
      menu_name: item.menu_name,
      price: item.price,
      menu_image: item.menu_image,
      quantity: quantity
    });
  }

  // คืนค่าตะกร้าของโต๊ะนั้น ๆ
  return session.cart[table_number];
};
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

//     // เรียกฟังก์ชันเพิ่มลง cart (สมมติชื่อ addToCartToSession)
//     const result = await addToCartToSession(req.session, tableNumber, menu_id, quantity);

//     return res.status(200).json({ message: "เพิ่มลงตะกร้าเรียบร้อย", data: result });
//   } catch (error) {
//     console.error("Error in addToCart:", error);  // เช็ค log นี้
//     res.status(500).json({ error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
//   }
// };



// exports.getCart = (session) => {
//     return session.cart || [];
// };

// exports.updateCartItem = (session, menu_id, quantity) => {
//   // ตรวจสอบว่ามีตะกร้าใน session หรือไม่
//   if (!session.cart) {
//     session.cart = [];
//   }

//   // ค้นหารายการในตะกร้าที่ตรงกับ menu_id
//   const cartItem = session.cart.find(item => item.menu_id === parseInt(menu_id));

//   // ถ้าไม่พบเมนูในตะกร้า
//   if (!cartItem) {
//     throw new Error("ไม่พบเมนูในตะกร้า");
//   }

//   // อัปเดตจำนวนของรายการในตะกร้า
//   cartItem.quantity = quantity;

//   return session.cart;
// };



// exports.removeFromCart = (session, menu_id) => {
//   if (!session.cart) return [];

//   session.cart = session.cart.filter(item => item.menu_id != menu_id);
//   return session.cart;
// };
exports.getCart = (session, table_number) => {
  if (!session.cart) return [];
  return session.cart[table_number] || [];
};

exports.updateCartItem = (session, table_number, menu_id, quantity) => {
  // ตรวจสอบและสร้าง cart หากยังไม่มี
  if (!session.cart) {
    session.cart = {};
  }

  if (!session.cart[table_number]) {
    throw new Error("ยังไม่มีรายการในตะกร้าสำหรับโต๊ะนี้");
  }

  // แปลง quantity เป็นจำนวนเต็ม
  quantity = parseInt(quantity);
  if (isNaN(quantity)) {
    throw new Error("จำนวนไม่ถูกต้อง");
  }

  const itemIndex = session.cart[table_number].findIndex(i => i.menu_id == menu_id);
  if (itemIndex === -1) {
    throw new Error("ไม่พบเมนูในตะกร้า");
  }

  // อัปเดตจำนวน
  session.cart[table_number][itemIndex].quantity = quantity;

  // ลบรายการถ้าจำนวน <= 0
  if (quantity <= 0) {
    session.cart[table_number].splice(itemIndex, 1);
  }

  return session.cart[table_number];
};



exports.removeFromCart = (session, table_number, menu_id) => {
  if (!session.cart || !session.cart[table_number]) return [];

  const index = session.cart[table_number].findIndex(item => String(item.menu_id) === String(menu_id));
  if (index !== -1) {
    session.cart[table_number].splice(index, 1);
  }
  return session.cart[table_number];
};




// exports.clearCart = (session, table_number) => {
//   if (session.cart && session.cart[table_number]) {
//     session.cart[table_number] = [];
//   }
//   return [];
// };

exports.clearCart = (session, tableNumber) => {
  if (!session.cart || !session.cart[tableNumber]) return [];

  // ล้างเฉพาะตะกร้าของโต๊ะนั้น
  session.cart[tableNumber] = [];

  return session.cart[tableNumber];
};
