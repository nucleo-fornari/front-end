import React from 'react';
// import './index.css'
import Header from '../../components/site-institucional/Header';
import logo from '../../assets/imgs/logoAzul.png'
import Banner from '../../components/site-institucional/Banner';
import ProjetoSection from '../../components/site-institucional/ProjetoSection';
import Escola from '../../components/site-institucional/Escola';
import Footer from '../../components/site-institucional/Footer';

function Home(){
  return(
    <React.StrictMode>
    <Header logoAzul={logo}/>
    <Banner />
    <ProjetoSection />
    <Escola />
    <Footer/>
  </React.StrictMode>
  );
}
export default Home;
