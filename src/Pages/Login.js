import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import { Button } from 'react-bootstrap';
import { RiUserAddFill } from 'react-icons/ri';



import axios from '../API/api';
const LOGIN_URL = '/login';


const Login = () => {
  
    const navigate = useNavigate();
    
    const { username, setEmail, setUserName } = useContext(UserContext);
    const userRef = useRef();
    const errRef = useRef();

    
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

            else {
                alert(response.data.message)
                setSuccess(false);
                setInputEmail('');
                setPassword('');
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
                    <p> Redirecting you </p>
                </div>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1><RiUserAddFill /> LOGIN</h1>
                    <hr/>
                    <form onSubmit={handleSubmit} className="m-1">
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
                        <Button onClick={handleSubmit}>Login</Button>
                    </form>
                    <div className="m-1">
                        New to Good Bank? <Link to={"/signup"}>Create Account</Link>
                    </div>
                </section>
            )}
        </div>
    )
}
      
export default Login;