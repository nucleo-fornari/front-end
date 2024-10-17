import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css'
import ProfessorPage from './views/professor/professorView';
import SideMenu from './components/SideMenu/sideMenuView';
import ParentsPage from './views/parents/parentsView';
import ParentsPageReuniao from './views/parents/parentsView';
import ParentsPageAgenda from './views/parents/parentsView';
import Header from './components/Dashboards/Header';
import Avisos from './components/Dashboards/Avisos';
import Agenda from './components/Dashboards/Agenda';
// import LoginPage from './routes/loginPage';
import SecretaryPage from './views/secretary/SecretaryView';
import ChamadosSecretaria from './components/chamadosSecretaria/ChamadosSecretaria.jsx';
import PublicacaoSecretaria from './components/publicacaoSecretaria/PublicacaoSecretaria.jsx';
import CalendarioSecretaria from './components/calendarioSecretaria/CalendarioSecretaria.jsx';
import Gerencia from './components/gerencia/Gerencia.jsx';

const sideMenuItens = {
  SECRETARIA: [
    {
      icon: '',
      name: 'Chamados',
      route: '/secretaria'
    },
    { 
      icon: '',
      name: 'Publicações',
      route: '/secretaria/publicacao' 
    },
    { 
      icon: '',
      name: 'Calendário',
      route: '/secretaria/calendario'
    },
    {
      icon: '',
      name: 'Gerenciar',
      route: '/secretaria/gerencia'
    },
  ],
  PROFESSOR: [
    {
      icon: '',
      name: 'Calendario',
      route: '/calendario'
    },
    { 
      icon: '',
      name: 'Publicações',
      route: '/publicacao'
    },
    { 
      icon: '',
      name: 'Chamados',
      route: '/chamado'
    },
    { 
      icon: '',
      name: 'Relatorio',
      route: '/relatorio'
    },
  ],
  RESPONSAVEL: [
    { 
      icon: '',
      name: 'Publicações',
      route: '/publicacao'
    },
    { 
      icon: '',
      name: 'Reuniões',
      route: '/reuniao'
    },
    { 
      icon: '',
      name: 'Agenda',
      route: '/agenda'
    },
  ]
};

// const pages = {
//   SECRETARIA: <SecretaryPage />,
//   PROFESSOR: <ProfessorPage />,
//   RESPONSAVEL: <ParentsPage />
// };

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Navigate to="/secretaria" />
  },
  {
    path: "/secretaria",
    element: <SecretaryPage/>,
    children: [
      {
        path: "/secretaria",
        element: <ChamadosSecretaria/>
      },
      {
        path: "/secretaria/publicacao",
        element: <PublicacaoSecretaria/>
      },
      {
        path: "/secretaria/calendario",
        element: <CalendarioSecretaria/>
      },
      {
        path: "/secretaria/gerencia",
        element: <Gerencia/>
      },
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));

// if (cargo && sideMenuItens[cargo] && pages[cargo]) {
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>

    // <main className='flex'>
    //   <aside >
    //   <SideMenu menuItens={sideMenuItens[cargo]} />

    //   </aside>
    //   <section className='flex flex-col w-full'>
    //   {pages[cargo]}

    //   </section>
    // </main>
  );
// }

