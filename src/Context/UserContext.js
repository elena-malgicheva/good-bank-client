import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('Guest');

  return (
    <UserContext.Provider value={{ email, username, setEmail, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

