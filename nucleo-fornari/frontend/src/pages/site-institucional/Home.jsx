import React, { useEffect } from 'react';
import Header from '../../components/site-institucional/Header';
import logo from '../../assets/imgs/logoAzul.png';
import Banner from '../../components/site-institucional/Banner';
import ProjetoSection from '../../components/site-institucional/ProjetoSection';
import Escola from '../../components/site-institucional/Escola';
import Footer from '../../components/site-institucional/Footer';

function Home() {
  useEffect(() => {
    document.body.style.overflowY = "auto"; // Permite rolagem na Home
    
    return () => {
      document.body.style.overflowY = "hidden"; // Bloqueia rolagem ao sair da Home
    };
  }, []);

  return (
    <>
      <Header logoAzul={logo} />
      <Banner />
      <ProjetoSection />
      <Escola />
      <Footer />
    </>
  );
}

export default Home;
