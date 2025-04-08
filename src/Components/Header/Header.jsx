import React from "react";
import "../Header/header.css";
import logo from "../../img/logo.svg";
import home from "../../img/home.svg";
import calendar from "../../img/calendar.svg";
import student from "../../img/student.svg";
import teachers from "../../img/teachers.svg";
import statistics from "../../img/statistics.svg";
import setting from "../../img/setting.svg";
import logout from "../../img/logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Добавляем useNavigate

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Хук для навигации

    // Функция для выхода из учетной записи
    const handleLogout = () => {
        const userData = localStorage.getItem("user");

        if (userData) {
            // Если пользователь авторизован, показываем диалоговое окно с подтверждением
            const confirmLogout = window.confirm("Вы точно хотите выйти?");
            if (confirmLogout) {
                // Удаляем данные из localStorage
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/home"); // Перенаправляем на страницу /home
                window.location.reload(); // Обновляем страницу
            }
        } else {
            // Если пользователь не авторизован, перенаправляем на страницу авторизации
            navigate("/login");
        }
    };

    return (
        <header id="menu">
            <nav className="nav-menu">
                <ul className="nav-menu-wrapper">
                    <li className="nav-menu-item">
                        <img src={logo} alt="Logo" />
                    </li>
                    <div className="nav-menu-items-container">
                        <li className="nav-menu-item">
                            <Link to="/home" className={`link ${location.pathname === "/home" ? "active" : ""}`} title="Главную страницу">
                                <img src={home} alt="Home" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/calendar" className={`link ${location.pathname === "/calendar" ? "active" : ""}`} title="Календарь">
                                <img src={calendar} alt="Calendar" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/students" className={`link ${location.pathname === "/students" ? "active" : ""}`} title="Студенты">
                                <img src={student} alt="Students" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/teachers" className={`link ${location.pathname === "/students" ? "active" : ""}`} title="Преподаватели">
                                <img src={teachers} alt="Teachers" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/statistics" className={`link ${location.pathname === "/statistics" ? "active" : ""}`} title="Статистика">
                                <img src={statistics} alt="Statistics" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/settings" className={`link ${location.pathname === "/settings" ? "active" : ""}`} title="Настройки">
                                <img src={setting} alt="Settings" />
                            </Link>
                        </li>
                    </div>
                    <div>
                        <li className="nav-menu-item logout">
                            <div
                                className="link"
                                onClick={handleLogout} // Обработчик для выхода
                                title="Выйти"
                                style={{ cursor: "pointer" }} // Добавляем курсор для интерактивности
                            >
                                <img src={logout} alt="Logout" />
                            </div>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;