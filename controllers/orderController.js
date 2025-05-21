const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { table_number, cartItems } = req.body;

    if (!table_number || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'ข้อมูลไม่ครบถ้วน' });
    }

    const result = await orderModel.createOrder(table_number, cartItems);
    res.json({ message: 'สร้างคำสั่งซื้อเรียบร้อย', order_id: result.order_id });
  } catch (err) {
    console.error('เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ:', err);
    res.status(500).json({ error: 'ไม่สามารถสร้างคำสั่งซื้อได้' });
  }
};
