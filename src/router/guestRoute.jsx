import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../context/auth";

function GuestRoute({ children }) {
  let { authenticated } = useAuth();

  return (
    <Route>{!authenticated ? <Outlet /> : <Navigate to="/dashboard" />}</Route>
  );
}

export default GuestRoute;
