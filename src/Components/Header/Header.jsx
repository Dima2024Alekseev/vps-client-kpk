import React from "react";
import "../Header/header.css";
import logo from "../../img/logo.svg";
import home from "../../img/home.svg";
import calendar from "../../img/calendar.svg";
import student from "../../img/student.svg";
import statistics from "../../img/statistics.svg";
import setting from "../../img/setting.svg";
import logout from "../../img/logout.svg";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="nav-menu">
                <ul className="nav-menu-wrapper">
                    <li className="nav-menu-item">
                        <img src={logo} alt="Logo" />
                    </li>
                    <div className="nav-menu-items-container">
                        <li className="nav-menu-item">
                            <Link to="/" className="link" title="Главную страница">
                                <img src={home} alt="Home" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/calendar" className="link" title="Календарь">
                                <img src={calendar} alt="Calendar" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/students" className="link" title="Студенты">
                                <img src={student} alt="Students" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/statistics" className="link" title="Статистика">
                                <img src={statistics} alt="Statistics" />
                            </Link>
                        </li>
                        <li className="nav-menu-item">
                            <Link to="/settings" className="link" title="Настройки">
                                <img src={setting} alt="Settings" />
                            </Link>
                        </li>
                    </div>
                    <li className="nav-menu-item logout">
                        <Link to="/login" className="link" title="Выйти">
                            <img src={logout} alt="Logout" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
