import React from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";


export default function Header() {

  
  const navLinkStyles = ({isActive}) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "none",
      background: isActive ? '#eeebeb' : ''
    }
  }
  const { auth } = useContext(AuthContext);
  
    return (
    <div>
      <header className="header">
        <h1 className="site-info">
          Share your needless baby clothes and toys and help other children
        </h1>
      </header>
      <nav className="navigation">
      {/* {auth.email && <span>{auth.email}</span>} */}
        <ul className="nav-list">
        {auth.accessToken &&
        <NavLink to={"/profile"} style={navLinkStyles} className="nav-list-item"><li>Profile</li></NavLink>
        }
        <NavLink style={navLinkStyles} to="/" className="nav-list-item"><li>Home</li></NavLink>
        <NavLink style={navLinkStyles} to="/catalog" className="nav-list-item"><li>Catalog</li></NavLink>
        {auth.accessToken == undefined &&
        <>
        <NavLink style={navLinkStyles} to="/login" className="nav-list-item"><li>Login</li></NavLink>
        <NavLink style={navLinkStyles} to="/register" className="nav-list-item"> <li>Register</li></NavLink>
        </>
        }
        {auth.accessToken &&
        <>
        <NavLink style={navLinkStyles} to="/create" className="nav-list-item"> <li>Create</li></NavLink>
        <NavLink to={"/logout"} style={navLinkStyles} className="nav-list-item"><li>Logout</li></NavLink> 
          </>
        }
        </ul>
      </nav>
      <section className="logo">
        <img src="../images/logo2.png" alt="baby-logo" />
      </section>
    </div>
  );
}
