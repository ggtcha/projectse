// const express = require('express');
// const sql = require('mssql');
// const bcrypt = require('bcryptjs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// require('dotenv').config(); // โหลดตัวแปรจาก .env

// const app = express();
// app.use(cors());  // เปิดใช้งาน CORS
// app.use(bodyParser.json());  // ใช้ body-parser สำหรับการอ่านข้อมูล JSON

// // ข้อมูลการเชื่อมต่อฐานข้อมูล
// const dbConfig = {
//   user: 'sa',
//   password: '123456789',
//   server: 'localhost',
//   database: 'projectse',
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//   },
// };

// // เชื่อมต่อกับฐานข้อมูล
// sql.connect(dbConfig)
//   .then(() => console.log('Connected to SQL Server'))
//   .catch((err) => console.error('Database connection failed', err));

// // ฟังก์ชัน Middleware สำหรับตรวจสอบ JWT Token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ message: 'Access Token Required' });

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {  // ใช้ secret key จาก .env
//     if (err) return res.status(403).json({ message: 'Invalid Token' });
//     req.user = user;
//     next();
//   });
// }

// // API สำหรับการลงทะเบียนผู้ใช้
// app.post('/api/register', async (req, res) => {
//   const { fullName, idNumber, password } = req.body;

//   // ตรวจสอบว่ามีการส่งข้อมูลครบถ้วนหรือไม่
//   if (!fullName || !idNumber || !password) {
//     return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
//   }

//   const fullNameArray = fullName.split(' ');
//   const firstName = fullNameArray[0];
//   const lastName = fullNameArray.slice(1).join(' ');

//   try {
//     const pool = await sql.connect(dbConfig);
//     const result = await pool.request()
//       .input('idNumber', sql.NVarChar, idNumber)
//       .query('SELECT COUNT(*) AS count FROM [dbo].[User] WHERE CitizenID = @idNumber');

//     if (result.recordset[0].count > 0) {
//       return res.status(400).send('หมายเลขบัตรประชาชนนี้มีการลงทะเบียนแล้ว');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);  // เข้ารหัสรหัสผ่าน
//     await pool.request()
//       .input('firstName', sql.NVarChar, firstName)
//       .input('lastName', sql.NVarChar, lastName)
//       .input('idNumber', sql.NVarChar, idNumber)
//       .input('hashedPassword', sql.NVarChar, hashedPassword)
//       .query(`INSERT INTO [dbo].[User] (FirstName, LastName, CitizenID, PasswordHash)
//               VALUES (@firstName, @lastName, @idNumber, @hashedPassword)`);

//     res.status(200).send('ลงทะเบียนสำเร็จ');
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).send(`เกิดข้อผิดพลาดในการลงทะเบียน: ${err.message}`);
//   }
// });

// // API สำหรับการเข้าสู่ระบบ
// app.post('/api/login', async (req, res) => {
//   const { idNumber, password } = req.body;

//   try {
//     // Admin Login
//     if (idNumber === 'admin' && password === '123456') {
//       const token = jwt.sign({ userId: 'admin', role: 'admin' }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//       return res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', token, role: 'admin' });
//     }

//     // Connect to Database
//     const pool = await sql.connect(dbConfig);
//     const result = await pool.request()
//       .input('idNumber', sql.NVarChar, idNumber)
//       .query('SELECT * FROM [dbo].[User] WHERE CitizenID = @idNumber');

//     const user = result.recordset[0];

//     // User Validation
//     if (!user) {
//       return res.status(400).send('ผู้ใช้ไม่พบ');
//     }

//     const isMatch = await bcrypt.compare(password, user.PasswordHash);
//     if (!isMatch) {
//       return res.status(400).send('รหัสผ่านไม่ถูกต้อง');
//     }

//     // Generate Token
//     const token = jwt.sign({ userId: user.UserID, role: 'user' }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
//     res.status(200).json({
//       message: 'เข้าสู่ระบบสำเร็จ',
//       token,
//       role: 'user',
//       idNumber: user.CitizenID // เพิ่มค่า idNumber ลงใน Response
//     });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
//   }
// });

// // API สำหรับดึงข้อมูลผู้ใช้ (Protected Route)
// app.get('/api/user/:idNumber', authenticateToken, async (req, res) => {
//   const idNumber = req.params.idNumber;

//   try {
//     const pool = await sql.connect(dbConfig);
//     const result = await pool.request()
//       .input('idNumber', sql.NVarChar, idNumber)
//       .query(
//         `SELECT FirstName + ' ' + LastName AS fullName, CitizenID AS idNumber
//          FROM [dbo].[User]
//          WHERE CitizenID = @idNumber`
//       );

//     if (result.recordset.length > 0) {
//       res.json(result.recordset[0]);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (err) {
//     console.error('Error fetching user data:', err);
//     res.status(500).json({ message: 'Error fetching user data' });
//   }
// });

// // กำหนดพอร์ตสำหรับ Backend
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // กำหนด API สำหรับดึงข้อมูล (API ที่ไม่ต้องการการยืนยันตัวตน)
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Data fetched successfully' });
// });
require('dotenv').config();  // โหลดไฟล์ .env

// ตรวจสอบว่า JWT_SECRET_KEY มีค่าหรือไม่
if (!process.env.JWT_SECRET_KEY) {
  console.error('JWT_SECRET_KEY is not defined in .env file');
  process.exit(1);  // ถ้าไม่มีค่าให้หยุดการทำงาน
}

const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());  // เปิดใช้งาน CORS
app.use(bodyParser.json());  // ใช้ body-parser สำหรับการอ่านข้อมูล JSON

// ข้อมูลการเชื่อมต่อฐานข้อมูล
const dbConfig = {
  user: 'sa',
  password: '123456789',
  server: 'localhost',
  database: 'projectse',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// เชื่อมต่อกับฐานข้อมูล
sql.connect(dbConfig)
  .then(() => console.log('Connected to SQL Server'))
  .catch((err) => console.error('Database connection failed', err));

// ฟังก์ชัน Middleware สำหรับตรวจสอบ JWT Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Token Required' });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {  // ใช้ secret key จาก .env
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
}

// API สำหรับการลงทะเบียนผู้ใช้
app.post('/api/register', async (req, res) => {
  const { fullName, idNumber, password } = req.body;

  if (!fullName || !idNumber || !password) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  const fullNameArray = fullName.split(' ');
  const firstName = fullNameArray[0];
  const lastName = fullNameArray.slice(1).join(' ');

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('idNumber', sql.NVarChar, idNumber)
      .query('SELECT COUNT(*) AS count FROM [dbo].[User] WHERE CitizenID = @idNumber');

    if (result.recordset[0].count > 0) {
      return res.status(400).send('หมายเลขบัตรประชาชนนี้มีการลงทะเบียนแล้ว');
    }

    const hashedPassword = await bcrypt.hash(password, 10);  // เข้ารหัสรหัสผ่าน
    await pool.request()
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('idNumber', sql.NVarChar, idNumber)
      .input('hashedPassword', sql.NVarChar, hashedPassword)
      .query(`INSERT INTO [dbo].[User] (FirstName, LastName, CitizenID, PasswordHash)
              VALUES (@firstName, @lastName, @idNumber, @hashedPassword)`);

    res.status(200).send('ลงทะเบียนสำเร็จ');
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send(`เกิดข้อผิดพลาดในการลงทะเบียน: ${err.message}`);
  }
});

// API สำหรับการเข้าสู่ระบบ
app.post('/api/login', async (req, res) => {
  const { idNumber, password } = req.body;

  try {
    // Admin Login
    if (idNumber === 'admin' && password === '123456') {
      const token = jwt.sign({ userId: 'admin', role: 'admin' }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', token, role: 'admin' });
    }

    // Connect to Database
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('idNumber', sql.NVarChar, idNumber)
      .query('SELECT * FROM [dbo].[User] WHERE CitizenID = @idNumber');

    const user = result.recordset[0];

    // User Validation
    if (!user) {
      return res.status(400).send('ผู้ใช้ไม่พบ');
    }

    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) {
      return res.status(400).send('รหัสผ่านไม่ถูกต้อง');
    }

    // Generate Token
    const token = jwt.sign({ userId: user.UserID, role: 'user' }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      role: 'user',
      idNumber: user.CitizenID // เพิ่มค่า idNumber ลงใน Response
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
  }
});

// API สำหรับดึงข้อมูลผู้ใช้ (Protected Route)
app.get('/api/user/:idNumber', authenticateToken, async (req, res) => {
  const idNumber = req.params.idNumber;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('idNumber', sql.NVarChar, idNumber)
      .query(
        `SELECT FirstName + ' ' + LastName AS fullName, CitizenID AS idNumber
         FROM [dbo].[User]
         WHERE CitizenID = @idNumber`
      );

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// กำหนดพอร์ตสำหรับ Backend
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// กำหนด API สำหรับดึงข้อมูล (API ที่ไม่ต้องการการยืนยันตัวตน)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Data fetched successfully' });
});

