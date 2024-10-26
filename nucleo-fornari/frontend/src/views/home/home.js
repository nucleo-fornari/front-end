import React from 'react';
import ReactDOM from 'react-dom/client';
// import ProfessorPage from './views/professor/professorView';
import './index.css'
// import Formulario from './components/Login/Formulario';
// import ParentsPage from './views/parents/parentsView';
// import SecretaryPage from './views/secretary/secretaryView'
import SideMenu from '../../components/SideMenu/sideMenuView';
import Header from '../../components/Site/Header';
import logo from './assets/imgs/logoAzul.png'
import Banner from '../../components/Site/Banner';
import ProjetoSection from '../../components/Site/ProjetoSection';
import Escola from '../../components/Site/Escola';
import Footer from '../../components/Site/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header logoAzul={logo}/>
    <Banner />
    <ProjetoSection />
    <Escola />
    <Footer/>
  </React.StrictMode>
);