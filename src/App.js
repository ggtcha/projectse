import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // นำเข้า Navigate
import 'bootstrap/dist/css/bootstrap.min.css';
import Navadmin from './navbar/navadmin';
import Navuser from './navbar/navuser'; 
import Home from './home/Home'; 
import Login from './login/login';
import Booking from './booking/booking';
import News from './news/News';
import Nationalpark from './nationalpark/nationalpark';
import TaskProvider from './Context/TaskContext';
import AdminDashboard from './admindashboard/admindashboard';
import Register from './Register';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || 'user'); // ดึง role จาก localStorage

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <TaskProvider>
      <Router>
        <div className="fixed-sidebar">
          {role === 'admin' ? <Navadmin /> : <Navuser />}
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/nationalpark" element={<Nationalpark />} />
            <Route path="/news" element={<News />} />
            {/* ใช้ Navigate แทน Redirect */}
            <Route path="/admindashboard" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
