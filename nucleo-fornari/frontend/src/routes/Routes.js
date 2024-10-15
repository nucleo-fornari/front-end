import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './loginPage';
import ProfessorPage from '../views/professor/professorView';
import SecretariaPage from '../views/secretary/secretaryView';
import ResponsaveisPage from '../views/parents/parentsView';
import PrivateRoute from './privateRoute'; // Rota protegida

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/professor" element={<PrivateRoute><ProfessorPage /></PrivateRoute>} />
        <Route path="/secretaria" element={<PrivateRoute><SecretariaPage /></PrivateRoute>} />
        <Route path="/responsaveis" element={<PrivateRoute><ResponsaveisPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
