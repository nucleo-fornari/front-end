import React from "react";
import Header from "../../components/header/Header.jsx";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/side-menu/sideMenuView.jsx";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function ProfessorPage() {
  const sideMenuItens = [
    {
      icon: <CalendarMonthIcon color="inherit" />,
      name: "Calendário",
      route: "/professor",
    },
    {
      icon: <NewspaperRoundedIcon color="inherit" />,
      name: "Publicações",
      route: "/professor/publicacoes",
    },
    {
      icon: <InboxIcon />,
      name: "Chamados",
      route: "/professor/chamados",
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

        <section className="flex flex-col w-full bg-white-main">
          <Header />
          <Outlet />
        </section>
        </main>
        <aside className="lg:hidden md:block">
          <SideMenu menuItens={sideMenuItens} />
        </aside>
      
    </React.StrictMode>
  );
}

export default ProfessorPage;
