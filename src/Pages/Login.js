import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import { Button } from 'react-bootstrap';
import { RiUserAddFill } from 'react-icons/ri';
import { GrLogin } from "react-icons/gr";

import axios from '../API/api';
const LOGIN_URL = '/login';


const Login = () => {
  
    const navigate = useNavigate();
    
    const { email, username, setEmail, setUserName } = useContext(UserContext);
    const userRef = useRef();
    const errRef = useRef();

    // const [username, setUsername] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [inputEmail, password])

  
    const handleSubmit = async (e) => {
      e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL,
                {   "email": inputEmail, 
                    "password": password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );


            if(response.data.success) {
                setEmail(inputEmail);
                setUserName(response.data.username);
                setSuccess(true);
                console.log("Letting your in", username)
                setTimeout(() => {
                navigate("/dashboard");
              }, 1000);
            }

        } catch (err) {
            console.log(err);
            setSuccess(false);
            setInputEmail('');
            setPassword('');
        }          
      
  }
  

  return (
    <div className="app-card w-50 p-5 m-3 create-color">
            {success ? (
                <div>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Redirecting you</a>
                    </p>
                </div>
            ) : (
                <div className="m-1">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1><RiUserAddFill /> LOGIN</h1>
                    <hr/>
                    <form onSubmit={handleSubmit} className="m-1">
                        <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="m-1"
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setInputEmail(e.target.value)}
                            value={inputEmail}
                            required
                        />
                        </div>
                        <div>
                        <label htmlFor="password" className="m-1">Password:</label>
                        <input
                            className="m-1"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        </div>
                        <Button>Login</Button>
                    </form>
                    <div className="m-1">
                        New to Good Bank? <Link to={"/signup"}>Create Account</Link>
                    </div>
                </div>
            )}
        </div>
    )
}
    
    //   <div className="app-card w-50 p-5 m-3 create-color">
    //   <h1>Login</h1>
    //   <hr />
    //   <form onSubmit={handleSubmit}>
    //     <div className="m-1">
    //       <label className="m-1" htmlFor="email">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         value={email}
    //         placeholder="Enter your email"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <div className="m-1">
    //       <label className="m-1" htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         placeholder="Enter your password"
    //         onChange={handleOnChange}
    //       />
    //     </div>
    //     <Button type="submit">Login</Button>
    //     <br/>
    //     <span>
    //       New to Good Bank? <Link to={"/signup"}>Signup</Link>
    //     </span>
    //   </form>
      
    // </div>
      

export default Login;