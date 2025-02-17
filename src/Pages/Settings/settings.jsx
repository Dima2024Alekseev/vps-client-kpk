import React from "react";
import { Helmet } from "react-helmet";
import "./settings.css";
import Header from "../../Components/Header/Header";


const Settings = () => {
    return (
        <>
            <Helmet>
                <title>Настройки</title>
            </Helmet>
            <div className="settings-page">
                <Header />
                <div className="settings-content">
                    <div className="cards-container">
                        <div className="card">
                            <div className="card-title">Настройка профиля</div>
                            <form className="form-container">
                                <div className="form-item">
                                    <label className="right-side-title-input">Имя</label>
                                    <input type="text" className="right-side-input" />
                                </div>
                                <div className="form-item">
                                    <label className="right-side-title-input">Фамилия</label>
                                    <input type="text" className="right-side-input" />
                                </div>
                                <div className="form-item">
                                    <select name="" id="">
                                        <option value="1">Роль</option>
                                    </select>
                                </div>
                                <div className="form-item">
                                    <label className="right-side-title-input">Изменить пароль</label>
                                    <input type="password" className="right-side-input" />
                                </div>
                                <button className="right-side-button" type="submit">
                                    Сохранить
                                </button>
                            </form>
                        </div>
                        <div className="card"></div>
                        <div className="card"></div>
                        <div className="card"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;