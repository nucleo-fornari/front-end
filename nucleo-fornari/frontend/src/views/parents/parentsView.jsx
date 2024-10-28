import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Outlet, Link } from 'react-router-dom';
import Header from "../../components/Dashboards/Header.js";
import SideMenu from "../../components/SideMenu/sideMenuView.jsx";
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';



function ParentsPage() {

  const sideMenuItens = [
    {
      icon: <NewspaperRoundedIcon />,
      name: 'Publicações',
      route: '/responsavel'
    },
    {
      icon: <PeopleRoundedIcon />,
      name: 'Reuniões',
      route: '/responsavel/reunioes'
    },
    {
      icon: <StickyNote2RoundedIcon />,
      name: 'Agenda',
      route: '/responsavel/agenda'
    },
  ]

  return (
    <React.StrictMode>

      <main className='flex'>


        <aside >

          <SideMenu menuItens={sideMenuItens} />


        </aside>

        <section className='flex flex-col w-full'>

          <Header />
          <Outlet />
        </section>

      </main>



    </React.StrictMode>
  );


}

export default ParentsPage;
