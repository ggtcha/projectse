import React, { createContext, useContext, useState } from 'react';

// สร้าง Context
const UserContext = createContext();

// Component สำหรับการจัดการข้อมูลผู้ใช้
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',    // เก็บข้อมูลจากการลงทะเบียน
    idNumber: '',  // เก็บข้อมูลจากการลงทะเบียน
  });

  // ฟังก์ชันสำหรับการอัปเดตข้อมูลผู้ใช้
  const updateUserData = (name, idNumber) => {
    setUserData({ name, idNumber });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook สำหรับการดึงข้อมูลผู้ใช้
export const useUserData = () => useContext(UserContext);
