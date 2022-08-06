import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { register } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

import "./login.css";

export default function Register() {

  const { onRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPass } = Object.fromEntries(new FormData(e.target));
    console.log(password);
    const confirmPassword = new FormData(e.target).get("confPassword");
    if (password != confirmPassword) {
      console.log("Password don`t mactch!");
      return;
    }
    //TODO form validation
    register(name, email, password)
      .then((res) => {
        if (res.code === 409) {
          console.log(res.message);
          return;
        }
        onRegister(res);
        navigate("/login");
      })
      .catch(() => {
        navigate("/404");
      });
    console.log(name);
  };


  return (
    <div>
      <section className="register-container">
        <img className="logo-img" src="../images/logo2.png" />
        <form id="register" onSubmit={onSubmit}>
          <div className="register-wrapper">
            <label htmlFor="email">Name</label>
            <input type="text" name="name" id="name" placeholder="" />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="John@abv.bg"
            />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="confPassword">Confirm Password</label>
            <input type="password" name="confPassword" id="confPassword" />
            <input type="submit" className="btn submit" value="Register" />
          </div>
        </form>
      </section>
    </div>
  );
}
