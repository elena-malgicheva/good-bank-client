import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from "./Components/Dashboard";
import AppNavbar from "./Components/Navbar";
import Foot from "./Components/Foot";
import { UserProvider } from './Context/UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    
    <div className="App">
      
      <UserProvider>
          <AppNavbar/>
          <Routes>
            <Route path="" element={ <Home/> } />
            <Route path="home" element={ <Home/> } />
            <Route path="login" element={ <Login/> } />
            <Route path="register" element={ <Signup/> } />
            <Route path="dashboard" element={ <Dashboard/> } />
            
          </Routes>
          <Foot />
      </UserProvider>
      
    </div>
    
  )
}

export default App;