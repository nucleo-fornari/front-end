import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InboxIcon from '@mui/icons-material/Inbox';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import SideMenu from '../../components/side-menu/sideMenuView.jsx';

function ProfessorPage() {
  const sideMenuItens = [
    {
      icon: <CalendarMonthIcon color="inherit" />,
      name: 'Calendário',
      route: '/professor',
    },
    {
      icon: <NewspaperRoundedIcon color="inherit" />,
      name: 'Publicações',
      route: '/professor/publicacoes',
    },
    {
      icon: <InboxIcon />,
      name: 'Chamados',
      route: '/professor/chamados',
    },
    // {
    //   icon: <DescriptionIcon />,
    //   name: 'Relatórios',
    //   route: '/professor/relatorio'
    // },
  ];

  return (
    <React.StrictMode>
      <main className="flex">
        <aside className="lg:block md:hidden">
          <SideMenu menuItens={sideMenuItens} />
        </aside>

        <section className="flex flex-col w-full bg-white-main h-screen">
          <Header />
          <Outlet />
          <aside className="lg:hidden md:block fixed bottom-0 left-0 right-0 z-50">
            <SideMenu menuItens={sideMenuItens} />
          </aside>
        </section>
      </main>
    </React.StrictMode>
  );
}

export default ProfessorPage;
