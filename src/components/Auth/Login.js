import React from "react";
import "./login.css";

import * as AuthService from "../../services/AuthServices";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { onLoginHandler } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //handlers
  const onLogin = (e) => {
    e.preventDefault();
    const { username, password } = Object.fromEntries(new FormData(e.target));
    console.log(e.target);
    if (username == "" || password == "") {
      setErrors((errors) => ({
        ...errors,
        ["error"]: true,
      }));
      return;
    }

    console.log(errors);
    AuthService.login(username, password)
      .then((res) => {
        // if (res) {
          onLoginHandler(res);
          toast.success("Login successfuly!");
          navigate("/");
          
        // }
      })
      .catch((err) => {
        console.log(err)
        err.message = "Username or Password was wrong!";
        toast.error(err.message);
      });
  };

  
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
            {errors.error && (
              <p className="form-error">Username and Password is required!</p>
            )}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            {/* {errors.error && (
              <p className="form-error">Username and Password is required!</p>
            )} */}
            <input type="submit" className="btn submit" value="Login" />
          </div>
        </form>
      </section>
    </div>
  );
}
