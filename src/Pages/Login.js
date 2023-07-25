import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../Context/AuthContext';


import { Button } from 'react-bootstrap';


const Login = () => {
  const { login } = useContext(AuthContext);
  
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    console.error(err);
  const handleSuccess = (msg) =>
    console.log(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://good-bank-server-05e57b3f40b4.herokuapp.com/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, userName, userEmail } = data;
      
      console.log(inputValue.email);
      if (success) {
        handleSuccess(message);
        console.log("LETTING YOU IN")
        login(userName, userEmail);
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    
      <div className="app-card w-50 p-5 m-3 create-color">
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="m-1">
          <label className="m-1" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="m-1">
          <label className="m-1" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <Button type="submit">Login</Button>
        <br/>
        <span>
          New to Good Bank? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      
    </div>
      
    
  );
};

export default Login;