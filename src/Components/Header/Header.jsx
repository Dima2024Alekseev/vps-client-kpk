import React from "react";
import "../Header/header.css";
import logo from "../../img/logo.svg";
import home from "../../img/home.svg";
import calendar from "../../img/calendar.svg";
import student from "../../img/student.svg";
import statistics from "../../img/statistics.svg";
import setting from "../../img/setting.svg";
import logout from "../../img/logout.svg";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

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
                            <Link to="/login" className="link" title="Выйти">
                                <img src={logout} alt="Logout" />
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;