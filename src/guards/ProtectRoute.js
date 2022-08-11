import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    const isAuth = !!auth["accessToken"];
    return isAuth === true ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectRoute;