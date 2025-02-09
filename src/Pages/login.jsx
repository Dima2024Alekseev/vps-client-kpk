import React from "react";
import "../style/login.css";
import logo_auth from "../img/logo-auth.svg";

const Login = () => {
  return <>
    <main className="auth-main-container">
      <div className="left-side-auth">
        <div className="left-side-auth-logo-container">
          <img src={logo_auth} alt="" />
        </div>
      </div>
      <div className="right-side-auth">
        <div className="right-side-auth-title">Авторизация</div>
        <form className="auth-form-container" onsubmit="handleRedirect(event)">
          <div className="auth-form-item">
            <label className="right-side-auth-title-input">Логин</label>
            <input type="text" className="right-side-auth-input" />
          </div>
          <div className="auth-form-item">
            <label className="right-side-auth-title-input">Пароль</label>
            <input type="password" className="right-side-auth-input" />
          </div>
          <button className="right-side-auth-button" type="submit">
            Авторизоваться
          </button>
        </form>
      </div>
    </main>

  </>;
};

export default Login;