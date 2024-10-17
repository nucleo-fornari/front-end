import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import ProfessorPage from './views/professor/professorView';
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
// import Formulario from './components/Login/Formulario';
// import ParentsPage from './views/parents/parentsView';
// import SecretaryPage from './views/secretary/secretaryView'
// import SideMenu from './components/SideMenu/sideMenuView';
// import ParentsPage from './views/parents/parentsView';
import Calendar from './components/Calendar/Calendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
    <Calendar></Calendar>
    </LocalizationProvider>
  </React.StrictMode>
);