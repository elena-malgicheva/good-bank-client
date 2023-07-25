import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const SomeComponent = () => {

  const navigate = useNavigate();
  const { isAuthenticated, logoff } = useContext(AuthContext);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome! You are logged in.</p>
      ) : (
        <p>Please log in to access this feature.</p>
      )}
      
      <Button className = "m-2" variant="warning" onClick={handleLogin}>
        LOGIN
      </Button>

      <Button className="m-2" variant="warning" onClick={logoff}>
        SIGNUP
      </Button>
    </div>
  );
};

export default SomeComponent;
