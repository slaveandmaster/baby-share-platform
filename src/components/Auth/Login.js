import React from "react";
import "./login.css";

import * as AuthService from "../../services/AuthServices";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { onLoginHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  //handlers
  const onLogin = (e) => {
    e.preventDefault();
    const { username, password } = Object.fromEntries(new FormData(e.target));
    console.log(username);
    AuthService.login(username, password)
      .then((res) => {
        console.log(res);
        onLoginHandler(res);
        toast.success('Login successfuly!')
        navigate("/");
      })
      .catch(() => {
        navigate("/NotFound");
      });
  };

  //TODO VALIDATIONS
  return (
    <div>
      <section className="login-container">
        <img className="logo-img" src="../images/logo2.png" />
        <form id="login" onSubmit={onLogin}>
          <div className="login-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="JohnDoe"
            />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <input type="submit" className="btn submit" value="Login" />
          </div>
        </form>
      </section>
    </div>
  );
}
