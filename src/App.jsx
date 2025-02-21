import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Calendar from "./Pages/Calendar/calendar";
import Students from "./Pages/Students/students";
import Statistics from "./Pages/Statistics/statistics";
import Settings from "./Pages/Settings/settings";
import Login from "./Pages/Authorization/login";
import "./style/config.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/students" element={<Students />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
