import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import Header from './components/Site/Header';
import logo from './assets/imgs/logoAzul.png'
import Banner from './components/Site/Banner';
import ProjetoSection from './components/Site/ProjetoSection';
import Escola from './components/Site/Escola';
import Footer from './components/Site/Footer';


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