import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from 'react-bootstrap/Button';
import { RiUserAddFill } from 'react-icons/ri';



const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
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
        "https://good-bank-server-05e57b3f40b4.herokuapp.com/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        alert("Account successfully created")
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
      username: "",
    });
  };

  return (
    <div className="app-card w-50 p-5 m-3 create-color">
      <h1 className="m3"><RiUserAddFill/>Create Account</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="m-1 ">
          <label className="m-1" htmlFor="email">Email</label>
          <input className="m-1"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="m-1">
          <label className="m-1" htmlFor="email">Username</label>
          <input className="m-1"
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div className="m-1">
          <label className="m-1" htmlFor="password">Password</label>
          <input className="m-1"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <Button type="submit">Submit</Button>
        <br/>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      
    </div>
  );
};

export default Signup;