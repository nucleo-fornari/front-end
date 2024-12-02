import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

    if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.func) && user.func === null) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;