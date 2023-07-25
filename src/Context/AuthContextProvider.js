import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('Guest');

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider user={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
