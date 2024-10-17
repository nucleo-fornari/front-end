// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginPage from './loginPage';
// import ProfessorPage from '../views/professor/professorView';
// import SecretariaPage from '../views/secretary/secretaryView';
// import ResponsaveisPage from '../views/parents/parentsView';
// import PrivateRoute from './privateRoute'; // Rota protegida

// function AppRoutes() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/professor" element={<PrivateRoute><ProfessorPage /></PrivateRoute>} />
//         <Route path="/secretaria" element={<PrivateRoute><SecretariaPage /></PrivateRoute>} />
//         <Route path="/responsaveis" element={<PrivateRoute><ResponsaveisPage /></PrivateRoute>} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }
// export default AppRoutes;

import Agenda from '../components/Dashboards/Agenda';
import Avisos from '../components/Dashboards/Avisos';
import ParentsPage from '../views/parents/parentsView';
import Reuniao from '../components/Dashboards/Reuniao';
import ProfessorPage from '../views/professor/professorView';
import {createBrowserRouter, Navigate } from 'react-router-dom';


export const router = createBrowserRouter([
  {
    path: "/", 
    element: <Navigate to="/responsavel" />
  },
  {
    path: "/responsavel",
    element: <ParentsPage/>,
    children: [
      {
        path: "/responsavel",
        element: <Avisos/>
      },
      {
        path: "/responsavel/reunioes",
        element: <Reuniao/>
      },
      {
        path: "/responsavel/agenda",
        element: <Agenda/>
      },
    ]
  },
  {
    path: "/professor",
    element:<ProfessorPage/>,
    children: [
      {
        path: "/professor/publicacoes"
      }
    ]
  }
])


