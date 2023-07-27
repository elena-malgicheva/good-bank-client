import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";


import Button from 'react-bootstrap/Button';
import { RiUserAddFill } from 'react-icons/ri';

import { UserContext } from '../Context/UserContext';


import axios from '../API/api';
const SIGNUP_URL = '/signup'

const Signup = () => {
  const navigate = useNavigate();
  const { email, username, setEmail, setUserName } = useContext(UserContext);
  const [inputValue, setInputValue] = useState({
    inputEmail: "",
    inputPassword: "",
    inputUsername: "",
  });
  const { inputEmail, inputPassword, inputUsername } = inputValue;
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
    console.log("submitting")
    e.preventDefault();
    try {
      const { data } = await axios.post(
        SIGNUP_URL,
        {
          ...inputValue,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setEmail(inputEmail);
        setUserName(inputUsername);
        alert("Account successfully created for user " + inputUsername);
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
      inputEmail: "",
      inputPassword: "",
      inputUsername: "",
    });
  };

  return (
    <div className="app-card w-50 p-5 m-3 create-color">
      <h1 className="m3"><RiUserAddFill/>Create Account</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="m-1 ">
          <label className="m-1" htmlFor="inputEmail">Email</label>
          <input className="m-1"
            type="inputEmail"
            name="inputEmail"
            value={inputEmail}
            placeholder="Enter your Email"
            onChange={handleOnChange}
          />
        </div>
        <div className="m-1">
          <label className="m-1" htmlFor="inputEmail">Username</label>
          <input className="m-1"
            type="text"
            name="inputUsername"
            value={inputUsername}
            placeholder="Enter your Username"
            onChange={handleOnChange}
          />
        </div>
        <div className="m-1">
          <label className="m-1" htmlFor="inputPassword">Password</label>
          <input className="m-1"
            type="password"
            name="inputPassword"
            value={inputPassword}
            placeholder="Enter your Password"
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