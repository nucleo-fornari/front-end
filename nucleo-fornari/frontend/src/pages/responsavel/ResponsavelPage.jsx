import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import SideMenu from '../../components/side-menu/sideMenuView.jsx';

function ParentsPage() {
  const sideMenuItens = [
    // {
    //   icon: <PeopleRoundedIcon />,
    //   name: 'Reuniões',
    //   route: '/responsavel/reunioes'
    // },
    {
      icon: <StickyNote2RoundedIcon />,
      name: 'Agenda',
      route: '/responsavel',
    },
  ];

  return (
    <React.StrictMode>
      <main className="flex">
        <aside className="lg:block md:hidden">
          <SideMenu menuItens={sideMenuItens} usuario="Flávia" />
        </aside>

        <section className="flex flex-col w-full h-screen">
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

export default ParentsPage;
