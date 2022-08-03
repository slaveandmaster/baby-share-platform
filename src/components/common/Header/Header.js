import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";


import { AuthContext } from "../../../context/AuthContext";


export default function Header() {

    const { auth } = useContext(AuthContext);

    const navLinkStyles = ({isActive}) => {
        return {
            fontWeight: isActive ? "bold" : "normal",
            textDecoration: isActive ? "none" : "undefined"
        }
    }

    return (
    <div>
      <header className="header">
        <h1 className="site-info">
          Share your needless baby clothes and toys and help other children
        </h1>
      </header>
      <nav className="navigation">
        <a className="profile-item">Profile</a>
        <ul className="nav-list">
        <NavLink style={navLinkStyles} to="/"><li className="nav-list-item">Home</li></NavLink>
        <NavLink style={navLinkStyles} to="/catalog"><li className="nav-list-item">Catalog</li></NavLink>
        <NavLink style={navLinkStyles} to="/create"> <li className="nav-list-item">Create</li></NavLink>
        <NavLink style={navLinkStyles} to="/login"><li className="nav-list-item">Login</li></NavLink>
        <NavLink style={navLinkStyles} to="/register"> <li className="nav-list-item">Register</li></NavLink>
          <li className="nav-list-item">Logout</li>
        </ul>
      </nav>
      <section className="logo">
        <img src="./images/logo2.png" alt="baby-logo" />
      </section>
    </div>
  );
}
