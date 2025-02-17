import React from "react";
import "./settings.css";
import Header from "../../Components/Header/Header";


const Settings = () => {
    return <>

        <div class="settings-page">
            <Header />
            <div class="settings-content">
                <div class="cards-container">
                    <div class="card">
                        <div class="card-title">Настройка профиля</div>
                        <form class="form-container">
                            <div class="form-item">
                                <label class="right-side-title-input">Имя</label>
                                <input type="text" class="right-side-input" />
                            </div>
                            <div class="form-item">
                                <label class="right-side-title-input">Фамилия</label>
                                <input type="text" class="right-side-input" />
                            </div>
                            <div class="form-item">
                                <select name="" id="">
                                    <option value="1">Роль</option>
                                </select>
                            </div>
                            <div class="form-item">
                                <label class="right-side-title-input">Изменить пароль</label>
                                <input type="password" class="right-side-input" />
                            </div>
                            <button class="right-side-button" type="submit">
                                Сохранить
                            </button>
                        </form>
                    </div>
                    <div class="card"></div>
                    <div class="card"></div>
                    <div class="card"></div>
                </div>
            </div>
        </div>
    </>;
};

export default Settings;