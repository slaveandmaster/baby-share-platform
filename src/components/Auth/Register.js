import React from "react";
import './login.css'

export default function Register() {
  return (
    <div>
      <section className="register-container">
        <form id="register">
          <div className="register-wrapper">
            <label for="email">Name</label>
            <input type="text" name="name" id="name" placeholder="" />
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="John@abv.bg"
            />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
            <label for="confPassword">Confirm Password</label>
            <input type="password" name="confPassword" id="confPassword" />
            <input type="submit" classNameName="btn submit" value="Register" />
          </div>
        </form>
        <img className="logo-img" src="../images/logo2.png" />
      </section>
    </div>
  );
}
