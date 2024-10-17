import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import ProfessorPage from './views/professor/professorView';
import './index.css'
import Header from './components/Site/Header';
import logo from './assets/imgs/logoAzul.png'
import Banner from './components/Site/Banner';
import ProjetoSection from './components/Site/ProjetoSection';
import Escola from './components/Site/Escola';
import Footer from './components/Site/Footer';
// import Formulario from './components/Login/Formulario';
// import ParentsPage from './views/parents/parentsView';
// import SecretaryPage from './views/secretary/secretaryView'
// import SideMenu from './components/SideMenu/sideMenuView';
// import ParentsPage from './views/parents/parentsView';
import Calendar from './components/Calendar/Calendar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header logoAzul={logo}/>
    <Banner />
    <ProjetoSection />
    <Escola />
    <Footer/>
    
    <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
    <Calendar></Calendar>
    </LocalizationProvider>
  </React.StrictMode>
);