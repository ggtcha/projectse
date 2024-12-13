import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login({ setRole }) {
  const [idCard, setIdCard] = useState(''); // เปลี่ยนเป็น idCard
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลแอดมิน (Hardcoded)
    if (idCard === 'admin' && password === '1212312121') {
      setRole('admin');
      localStorage.setItem('role', 'admin');
      navigate('/admindashboard');
      return;
    }

    // ดึงข้อมูลผู้ใช้จาก localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.idNumber === idCard && u.password === password
    );

    // ตรวจสอบข้อมูลผู้ใช้
    if (!idCard || idCard.length !== 13) {
      alert('กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง (13 หลัก)');
      return;
    }

    if (user) {
      // ถ้าผู้ใช้ล็อกอินสำเร็จ
      alert(`ยินดีต้อนรับ ${user.fullName}!`);
      setRole('user');
      localStorage.setItem('role', 'user');
      navigate('/'); // เปลี่ยนไปหน้าหลัก
    } else {
      // ถ้าข้อมูลไม่ถูกต้อง
      alert('ข้อมูลรับรองไม่ถูกต้อง');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="idCard">หมายเลขบัตรประชาชน</label>
            <input
              type="text"
              id="idCard"
              placeholder="กรอกหมายเลขบัตรประชาชน"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              maxLength="13" // จำกัดความยาว 13 ตัว
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              placeholder="กรอกรหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">เข้าสู่ระบบ</button>
        </form>
        <div className="register-link">
          <p>ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
