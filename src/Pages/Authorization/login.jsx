import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify"; // Импортируем toast
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import "./login.css";
import logo_auth from "../../img/logo-auth.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Хук для навигации

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Сохраняем токен
        localStorage.setItem("user", JSON.stringify(data.user)); // Сохраняем данные пользователя
        toast.success("Авторизация успешна!"); // Уведомление об успехе

        // Переход на главную страницу через 1 секунду (чтобы уведомление успело показаться)
        setTimeout(() => {
          navigate("/home"); // Программный переход на главную страницу
        }, 1000);
      } else {
        toast.error(data.error || "Ошибка при авторизации"); // Уведомление об ошибке
      }
    } catch (error) {
      toast.error("Ошибка при авторизации"); // Уведомление об ошибке
    }
  };

  return (
    <>
      <Helmet>
        <title>Авторизация</title>
      </Helmet>
      <main className="auth-main-container">
        <div className="left-side-auth">
          <div className="left-side-auth-logo-container">
            <img src={logo_auth} alt="" />
          </div>
        </div>
        <div className="right-side-auth">
          <div className="right-side-auth-title">Авторизация</div>
          <form className="auth-form-container" onSubmit={handleSubmit}>
            <div className="auth-form-item">
              <label className="right-side-auth-title-input">Логин</label>
              <input
                type="text"
                className="right-side-auth-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="auth-form-item">
              <label className="right-side-auth-title-input">Пароль</label>
              <input
                type="password"
                className="right-side-auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="right-side-auth-button" type="submit">
              Авторизоваться
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;