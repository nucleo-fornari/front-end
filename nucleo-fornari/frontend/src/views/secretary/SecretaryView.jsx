import React from 'react';
import api from '../../api.js'
import { BrowserRouter as Router, Route, Switch, Redirect, Outlet } from 'react-router-dom';
import SideMenu from '../../components/SideMenu/sideMenuView';
import ChamadosSecretaria from '../../components/chamadosSecretaria/ChamadosSecretaria.jsx';
import { FaClipboardList, FaBook, FaCalendarAlt, FaTools } from 'react-icons/fa';

function SecretaryPage() {
  const sideMenuItens = [
    {
      icon: <FaClipboardList />,
      name: 'Chamados',
      route: '/secretaria'
    },
    {
      icon: <FaBook />,
      name: 'Publicações',
      route: '/secretaria/publicacao'
    },
    {
      icon: <FaCalendarAlt />,
      name: 'Calendário',
      route: '/secretaria/calendario'
    },
    {
      icon: <FaTools />,
      name: 'Gerenciar',
      route: '/secretaria/gerencia'
    },
  ]

  return (
    <React.StrictMode>

      <main className='flex'>
        <aside >
          <SideMenu menuItens={sideMenuItens} />
        </aside>
        <section className='flex flex-col w-full'>
          <Outlet />
        </section>
      </main>



    </React.StrictMode>
  );
}

export default SecretaryPage;