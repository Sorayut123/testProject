const db = require('../config/db'); // เชื่อมต่อฐานข้อมูล

exports.createOrder = async (table_number, cartItems) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // เพิ่มข้อมูลในตาราง orders
    const [orderResult] = await connection.query(
      'INSERT INTO orders (table_number, status) VALUES (?, ?)',
      [table_number, 'pending'] // คุณเปลี่ยน 'pending' เป็นค่าอื่นได้
    );

    const orderId = orderResult.insertId; // ✅ เอา order_id ที่ได้ไปใช้ต่อ

    // เพิ่มรายการ order_items
    for (const item of cartItems) {
      await connection.query(
        'INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.menu_id, item.quantity, item.price]
      );
    }

    await connection.commit();
    return { order_id: orderId };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
