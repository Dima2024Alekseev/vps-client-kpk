import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Импортируем ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Импортируем стили
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
      <ToastContainer
        position="bottom-right" // Позиция уведомлений
        autoClose={3000} // Автоматическое закрытие через 3 секунды
        hideProgressBar={false} // Показывать прогрессбар
        newestOnTop={false} // Новые уведомления снизу
        closeOnClick // Закрывать по клику
        rtl={false} // Направление текста (слева направо)
        pauseOnFocusLoss // Пауза при потере фокуса
        draggable // Возможность перетаскивать уведомления
        pauseOnHover // Пауза при наведении
        theme="colored" // Тема уведомлений (light, dark, colored)
      /> {/* Добавляем контейнер для уведомлений */}
      <Routes>
        {/* Общедоступные маршруты */}
        <Route path="/login" element={<Login />} />

        {/* Защищенные маршруты */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <Statistics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAdmin>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;