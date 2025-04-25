import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />; // Перенаправление на страницу авторизации
  }

  // Если требуется доступ только для администратора
  if (isAdmin && user?.role !== "admin") {
    return <Navigate to="/home" />; // Перенаправление на главную страницу
  }

  return children;
};

export default ProtectedRoute;