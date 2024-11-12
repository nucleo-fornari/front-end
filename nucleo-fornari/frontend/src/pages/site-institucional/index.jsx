import React from 'react';
// import './index.css'
import Header from '../../components/Site/Header';
import logo from '../../assets/imgs/logoAzul.png'
import Banner from '../../components/Site/Banner';
import ProjetoSection from '../../components/Site/ProjetoSection';
import Escola from '../../components/Site/Escola';
import Footer from '../../components/Site/Footer';

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
