import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import './Navadmin.css'; 
import { FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'; // นำเข้า FaTasks ไอคอนใหม่

function Navadmin() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const handleLogout = () => {
    localStorage.removeItem('role'); // ลบ role จาก localStorage
    localStorage.removeItem('authToken'); // ลบ authToken (ถ้ามี)
    navigate('/login');
  };

  return (
    <div className="d-flex">
      <nav className="admin-navbar">
        <ul className="admin-navbar-nav">
          <li className="nav-item">
            <Link
              to="/admindashboard"
              className={`admin-nav-link ${location.pathname === '/admindashboard' ? 'active' : ''}`}
            >
              <i><FaTachometerAlt className="nav-icon" /></i>
              <span>Admin Dashboard</span>
            </Link>
            <Link
              to="/admindashboard"
              className={`admin-nav-link ${location.pathname === '/admindashboard' ? 'active' : ''}`}
            >
              <i><FaTachometerAlt className="nav-icon" /></i>
              <span>Admin Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="admin-nav-link logout-button">
              <i><FaSignOutAlt className="nav-icon" /></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navadmin;
