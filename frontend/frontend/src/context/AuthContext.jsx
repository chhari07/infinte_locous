/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    name: localStorage.getItem("name"),
  });

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("name", data.name);
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser({ token: null, role: null, name: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
