import React from 'react';
import { Link } from 'react-router-dom';
import './Navuser.css'; 

const Navuser = ({ role }) => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light py-3 mb-4 border-bottom" style={{ height: '70px' }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-inline-flex link-body-emphasis text-decoration-none">
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active px-2">หน้าหลัก</Link>
              </li>
              <li className="nav-item">
                <Link to="/booking" className="nav-link active px-2">การจอง</Link>
              </li>
              <li className="nav-item">
                <Link to="/nationalpark" className="nav-link active px-2">อุทยาน</Link>
              </li>
              <li className="nav-item">
                <Link to="/news" className="nav-link active px-2">ข่าวสาร</Link>
              </li>
            </ul>
            <Link to="/login" className="btn custom-btn me-2">Login</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navuser;
