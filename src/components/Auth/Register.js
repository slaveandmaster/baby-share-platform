import React from "react";
import "./login.css";

export default function Register() {
  return (
    <div>
      <section className="register-container">
        <img className="logo-img" src="../images/logo2.png" />
        <form id="register">
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
