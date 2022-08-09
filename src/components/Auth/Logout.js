import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../../services/AuthServices";


import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Logout() {
  const { auth, onLogoutHandler } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout(auth.refreshToken)

      onLogoutHandler();
      navigate("/");
   
  });
  return null;
}
