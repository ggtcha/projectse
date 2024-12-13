import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Booking.css';
import Select from 'react-select';

const Booking = () => {
  const [formData, setFormData] = useState({
    date: '',
    guests: 1,
    park: '', // เก็บชื่ออุทยานที่เลือก
  });

  const [userData, setUserData] = useState({
    name: '',
    idNumber: '',
  });

  const [parks, setParks] = useState([]); // รายชื่ออุทยาน
  const [remainingSpots, setRemainingSpots] = useState({}); // เก็บจำนวนที่นั่งที่เหลือในแต่ละอุทยาน

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users[users.length - 1]; // สมมติว่าผู้ใช้ล่าสุดคือล็อกอินอยู่
    if (currentUser) {
      setUserData({
        name: currentUser.fullName,
        idNumber: currentUser.idNumber,
      });
    }

    // สมมติว่าเรามีรายการอุทยาน
    const initialParks = [
      { label: 'อุทยานแห่งชาติแก่งกระจาน', value: 'แก่งกระจาน' },
      { label: 'อุทยานแห่งชาติหมู่เกาะสิมิลัน', value: 'หมู่เกาะสิมิลัน' },
      { label: 'อุทยานแห่งชาติภูลังกา', value: 'ภูลังกา' },
      { label: 'อุทยานแห่งชาติไทรทอง', value: 'ไทรทอง' },
      { label: 'อุทยานแห่งชาติสุพรรณบุรี', value: 'สุพรรณบุรี' },
    ];
    
    setParks(initialParks);

    // ตั้งค่าจำนวนที่นั่งที่เหลือสำหรับแต่ละอุทยาน
    const initialSpots = {};
    initialParks.forEach(park => {
      initialSpots[park.value] = 30; // สมมติว่าเริ่มต้นอุทยานทุกแห่งมีที่นั่ง 30
    });
    setRemainingSpots(initialSpots);
  }, []);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันจัดการเมื่อเลือกอุทยานจาก Select
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, park: selectedOption.value });
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจสอบจำนวนแขกว่ามากกว่าหรือเท่ากับที่เหลือหรือไม่
    if (formData.guests > remainingSpots[formData.park]) {
      alert('ไม่สามารถจองได้ เนื่องจากจำนวนที่นั่งเต็ม');
      return;
    }

    // บันทึกข้อมูลการจอง
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(formData);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // อัปเดตจำนวนที่นั่งที่เหลือ
    const updatedSpots = { ...remainingSpots };
    updatedSpots[formData.park] -= formData.guests;
    setRemainingSpots(updatedSpots); // อัปเดตจำนวนที่นั่งที่เหลือ

    alert('การจองของคุณได้รับการยืนยันแล้ว!');
  };

  return (
    <div className="booking-container container py-5">
      <h1 className="text-center mb-4">การจอง</h1>
      <form onSubmit={handleSubmit} className="booking-form mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            ชื่อ-นามสกุล
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={userData.name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idNumber" className="form-label">
            หมายเลขบัตรประชาชน
          </label>
          <input
            type="text"
            className="form-control"
            id="idNumber"
            value={userData.idNumber}
            readOnly
          />
        </div>

        {/* ช่องเลือกอุทยาน */}
        <div className="mb-3">
          <label htmlFor="park" className="form-label">
            เลือกอุทยาน
          </label>
          <Select
            id="park"
            name="park"
            options={parks}
            onChange={handleSelectChange}
            value={parks.find(option => option.value === formData.park)} // กำหนดค่าเลือกที่ตรงกับข้อมูลใน formData
            placeholder="เลือกอุทยาน"
            isSearchable={true} // เปิดให้สามารถค้นหาได้
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            วันที่
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="guests" className="form-label">
            จำนวนแขก
          </label>
          <input
            type="number"
            className="form-control"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max={remainingSpots[formData.park]} // จำกัดจำนวนแขกไม่ให้เกินที่เหลือในอุทยานที่เลือก
            required
          />
          <small className="form-text text-muted">
            จำนวนที่นั่งที่เหลือ: {remainingSpots[formData.park]} คน
          </small>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          ยืนยันการจอง
        </button>
      </form>
    </div>
  );
};

export default Booking;
