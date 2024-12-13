import { useState, useEffect } from 'react';
import './AdminDashboard.css'; // นำเข้า CSS

function AdminDashboard() {
  const [role, setRole] = useState(localStorage.getItem('role') || 'user'); // ตรวจสอบ role จาก localStorage

  useEffect(() => {
    if (role !== 'admin') {
      // ถ้า role ไม่ใช่ admin ก็ให้ redirect ไปหน้าอื่น
      window.location.href = '/';
    }
  }, [role]);

  return (
    <div className="admin-dashboard-container"> {/* ใช้คลาสจาก CSS */}
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is the main dashboard for admin users.</p>
    </div>
  );
}

export default AdminDashboard;
