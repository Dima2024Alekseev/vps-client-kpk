import React from 'react';
import { Link } from 'react-router';
import './style-profile-page.css';
import Header from '../../Components/Header/Header';
import profileIcon from "../../img/user-icon.svg";
import notificationIcon from "../../img/bell-icon.svg";

const ProfilePage = () => {
    return (
        <>
            <div className='page-profile'>
                <Header />
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-icons">
                            <div className='size-profile-icon'>
                                <img src={profileIcon} alt="Профиль" className="icon" />
                                <h3 className="profile-subtitle">Изменить фото</h3>
                            </div>
                            <div>
                                <img src={notificationIcon} alt="Уведомления" className="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="profile-info">
                        <div className="profile-column">
                            <div className="profile-row">
                                <span className="profile-label">Имя</span>
                                <input
                                    type="text"
                                    className="profile-input"
                                    defaultValue="Александр"
                                />
                            </div>
                            <div className="profile-row">
                                <span className="profile-label">Отчество</span>
                                <input
                                    type="text"
                                    className="profile-input"
                                    defaultValue="Валерьевич"
                                />
                            </div>
                            <div className="profile-row">
                                <span className="profile-label">Фамилия</span>
                                <input
                                    type="text"
                                    className="profile-input"
                                    defaultValue="Горбунов"
                                />
                            </div>
                        </div>
                        <div className="profile-column">
                            <div className="profile-row">
                                <span className="profile-label">Должность</span>
                                <input
                                    type="text"
                                    className="profile-input"
                                    defaultValue="Преподаватель ПЦК информационных технологий"
                                />
                            </div>
                            <div className="profile-row">
                                <span className="profile-label">Роль</span>
                                <input
                                    type="text"
                                    className="profile-input"
                                    defaultValue="Админ"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="profile-button edit-button-profile">Редактировать</button>
                        <Link to="/home">
                            <button className="profile-button logout-button-profile">Выйти</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;