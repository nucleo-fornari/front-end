import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-xl text-gray-700">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.func)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;