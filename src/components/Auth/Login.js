import React from "react";
import './login.css'

export default function Login() {
  return (
    <div>
      <section className="login-container">
        <form id="login">
          <div className="login-wrapper">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="John@abv.bg"
            />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
            <input type="submit" classNameName="btn submit" value="Login" />
          </div>
        </form>
        <img className="logo-img" src="../images/logo2.png" />
      </section>
    </div>
  );
}
