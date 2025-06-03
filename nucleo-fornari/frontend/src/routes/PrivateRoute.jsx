import { Navigate } from "react-router-dom";
import ProfessorPage from "../pages/professor/ProfessorPage";
import SecretaryPage from "../pages/secretaria/SecretariaPage";
import ParentsPage from "../pages/responsavel/ResponsavelPage";

const PrivateRoute = ({ allowedRoles }) => {
  const role = sessionStorage.getItem('FUNC');

  if (!role) {
    // Não está logado
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Não tem permissão
    return <Navigate to="/unauthorized" replace />;
  }

  // Tem permissão
  switch (role) {
    case "PROFESSOR":
      return <ProfessorPage />;
    case "SECRETARIO":
      return <SecretaryPage />;
    case "RESPONSAVEL":
      return <ParentsPage />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default PrivateRoute;
