import React from "react";
import { useAuth } from "../context/auth";
import ErrorPage from "../pages/ErrorPage";

function PermissionCheck({ children, permission, module }) {
  let currentUser = useAuth();

  let permissions = currentUser?.currentUser?.data?.permission;
  let role = currentUser?.currentUser?.data?.roles[0]?.name;
  // console.log("permissions :>> ", permission);
  if (permissions?.includes(permission) && role !== "Super Admin") {
    return children;
  } else if (role === "Super Admin") {
    return children;
  }
  return <div>{module ? <ErrorPage /> : ""}</div>;
}

export default PermissionCheck;
