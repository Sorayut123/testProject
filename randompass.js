const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey); // ใช้ค่าที่ได้จากการสุ่มเป็น secret
