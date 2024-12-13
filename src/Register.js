import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input (ตัวอย่างง่าย ๆ)
    if (!formData.fullName || !formData.idNumber || !formData.password) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // Validate ID Number length
    if (formData.idNumber.length !== 13) {
      alert('หมายเลขบัตรประชาชนต้องมี 13 หลัก');
      return;
    }

    // บันทึกข้อมูลลง localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // ตรวจสอบว่ามี ID Number ซ้ำหรือไม่
    if (users.some((user) => user.idNumber === formData.idNumber)) {
      alert('หมายเลขบัตรประชาชนนี้มีการลงทะเบียนแล้ว');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ');
    navigate('/login'); // เปลี่ยนไปหน้า Login
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2>สมัครสมาชิก</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">ชื่อ-นามสกุล</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="กรอกชื่อ-นามสกุล"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="idNumber">หมายเลขบัตรประชาชน</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="กรอกหมายเลขบัตรประชาชน"
              value={formData.idNumber}
              onChange={handleChange}
              maxLength="13"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="กำหนด Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
