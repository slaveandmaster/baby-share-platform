import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
    const auth = localStorage.getItem("auth");
    const isAuth = !!auth['accessToken'];
    return isAuth === true ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectRoute;