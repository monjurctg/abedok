import { useAuth } from "../context/auth";

function PermissionRoute({ children, permission }) {
  let currentUser = useAuth();

  let permissions = currentUser?.currentUser?.data?.permission;

  return permissions.includes(permission) ? children : "";
}

export default PermissionRoute;
