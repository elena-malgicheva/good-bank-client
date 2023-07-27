import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import { Button } from 'react-bootstrap';
import { RiUserAddFill } from 'react-icons/ri';

import axios from '../API/api';
const REGISTER_URL = '/register';

const Login = () => {
  
    const navigate = useNavigate();
    
    const { email, username, setEmail, setUserName } = useContext(UserContext);
    const userRef = useRef();
    const errRef = useRef();

    // const [username, setUsername] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputUsername, setInputUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [inputEmail, inputUsername, password])

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("submitting POST with " )
        try{
            const response = await axios.post(
                REGISTER_URL,
                {   "email": inputEmail,
                    "username": inputUsername, 
                    "password": password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );


            if(response.data.success) {
                setEmail(inputEmail);
                setUserName(inputUsername);
                setSuccess(true);
                setTimeout(() => {
                navigate("/dashboard");
              }, 1000);
            }

            else {
                alert(response.data.message)
                setSuccess(false);
                setInputEmail('');
                setPassword('');
            }

        } catch (err) {
            alert(err);
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
                        Redirecting you
                    </p>
                </div>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1><RiUserAddFill /> Create Account</h1>
                    <hr/>
                    <form onSubmit={handleSubmit} className="m-1">
                    <div>
                        <label htmlFor="username" className="m-1">Username</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setInputUsername(e.target.value)}
                            value={inputUsername}
                            required
                        />
                        </div>
                        <div>
                        <label htmlFor="email" className="m-1">Email</label>
                        <input
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
                        <Button onClick={handleSubmit}>Create Account</Button>
                    </form>
                    <div className="m-1">
                    Already have an account? <Link to={"/login"}>Login</Link>
                    </div>
                </section>
            )}
        </div>
    )
}
      
export default Login;