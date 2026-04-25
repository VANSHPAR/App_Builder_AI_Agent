import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Onboarding from "./components/Onboarding";
import Payroll from "./components/Payroll";
import Attendance from "./components/Attendance";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Navbar userName="John Doe" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/onboarding" element={<Onboarding/>}/>
        <Route path="/payroll" element={<Payroll/>}/>
        <Route path="/attendance" element={<Attendance/>}/>
         <Route path="/profile" element={<Profile/>}/>

      </Routes>
      
    </Router>
  );
}

export default App;