import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from "./Components/Dashboard";
import AppNavbar from "./Components/Navbar";
import Foot from "./Components/Foot";
import { AuthProvider } from './Context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    
    <div className="App">
      
      <AuthProvider>
          <AppNavbar/>
          <Routes>
            <Route path="" element={ <Home/> } />
            <Route path="login" element={ <Login/> } />
            <Route path="signup" element={ <Signup/> } />
            <Route path="dashboard" element={ <Dashboard/> } />
            
          </Routes>
          <Foot />
      </AuthProvider>
      
    </div>
    
  )
}

export default App;