import React, { createContext, useState } from 'react';

// Tạo context
export const UserContext = createContext();

// Tạo provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // State lưu thông tin người dùng

  return (
    <UserContext.Provider value={{ user, setUser }}> {/* Truyền cả user và setUser */}
      {children}
    </UserContext.Provider>
  );
}
