import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/home";
import Calendar from "./Pages/Calendar/calendar";
import Students from "./Pages/Students/students";
import Statistics from "./Pages/Statistics/statistics";
import Settings from "./Pages/Settings/settings";
import Login from "./Pages/Authorization/login";
import ScrollToTop from "./Components/ScrollToTop";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./style/config.css";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Общедоступные маршруты */}
        <Route path="/login" element={<Login />} />

        {/* Защищенные маршруты */}
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/calendar"
          element={<Calendar />}
        />
        <Route
          path="/students"
          element={<Students />}
        />
        <Route
          path="/statistics"
          element={<Statistics />}
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAdmin> {/* Только для администратора */}
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;