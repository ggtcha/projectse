// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserContext'; // ตรวจสอบว่า import path ถูกต้อง

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>  {/* ห่อ App ด้วย UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
