import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Guest');
  const [userEmail, setUserEmail] = useState('');

  // Function to toggle authentication status
  const toggleAuthentication = () => {
    setIsAuthenticated((prevAuthStatus) => !prevAuthStatus);
  };

  const login = (userName, userEmail) => {
    setIsAuthenticated(true);
    setUserName(userName);
    setUserEmail(userEmail);
  };

  const logoff = () => {
    setIsAuthenticated(false);
    setUserName('Guest');
    setUserEmail('');
  };

  
  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(savedAuthStatus === 'true');
  }, []);

  // useEffect to save the authentication status to local storage when it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userEmail, toggleAuthentication, login, logoff }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };