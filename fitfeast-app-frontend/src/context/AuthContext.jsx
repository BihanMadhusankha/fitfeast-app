import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fitfeast_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // Mock login logic
    // For demo purposes, any admin@fitfeast.com is Super Admin
    // Any coach@fitfeast.com is Gym Coach
    // Others are Customers
    let role = 'customer';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('coach')) role = 'coach';

    const user = { email, role, name: email.split('@')[0] };
    setCurrentUser(user);
    localStorage.setItem('fitfeast_auth_user', JSON.stringify(user));
    return user;
  };

  const register = (data) => {
    // Mock register logic
    const user = { ...data, email: data.email, role: data.role, name: data.name };
    setCurrentUser(user);
    localStorage.setItem('fitfeast_auth_user', JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fitfeast_auth_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
