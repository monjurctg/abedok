import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";

function AuthRoute() {
  let { authenticated } = useAuth();

  return authenticated ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRoute;
