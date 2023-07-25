import React from "react";
import { Routes, Route } from "react-router-dom";
import { BalanceProvider } from './Context/BalanceContext';
import { AuthContextProvider } from './Context/AuthContextProvider'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Deposit from "./Pages/Deposit";
import Withdraw from "./Pages/Withdraw";
import Dashboard from "./Components/Dashboard";
import AppNavbar from "./Components/Navbar";
import Foot from "./Components/Foot";

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    
    <div className="App">
      <AuthContextProvider>
      <BalanceProvider>
          <AppNavbar/>
          <Routes>
            <Route path="" element={ <Home/> } />
            <Route path="login" element={ <Login/> } />
            <Route path="signup" element={ <Signup/> } />
            <Route path="deposit" element={ <Deposit/> } />
            <Route path="withdraw" element={ <Withdraw/> } />
            <Route path="dashboard" element={ <Dashboard/> } />
            
          </Routes>
          <Foot />
      </BalanceProvider>
      </AuthContextProvider>
    </div>
    
  )
}

export default App;