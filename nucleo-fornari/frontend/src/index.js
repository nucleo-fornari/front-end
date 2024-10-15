import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
// import ProfessorPage from './views/professor/professorView';
import './index.css'
// import Formulario from './components/Login/Formulario';
// import ParentsPage from './views/parents/parentsView';
// import SecretaryPage from './views/secretary/secretaryView'
import SideMenu from './components/SideMenu/SideMenuParents';
import ParentsPage from './views/parents/parentsView';
import ParentsPageReuniao from './views/parents/parentsView';
import ParentsPageAgenda from './views/parents/parentsView';
import Header from './components/Dashboards/Header';
import Avisos from './components/Dashboards/Avisos';
import Agenda from './components/Dashboards/Agenda';
import LoginPage from './routes/loginPage';
import Titulo from './components/Dashboards/Titulo';
import {createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Reuniao from './components/Dashboards/Reuniao';


const router = createBrowserRouter([
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
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);