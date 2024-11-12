import React from "react";
import Header from "../../components/Dashboards/Header.js";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/SideMenu/sideMenuView.jsx";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import InboxIcon from "@mui/icons-material/Inbox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";

function ProfessorPage() {
  const sideMenuItens = [
    {
      icon: <CalendarMonthIcon color="inherit" />,
      name: "Calendário",
      route: "/professor/calendario",
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
        <aside>
          <SideMenu menuItens={sideMenuItens} />
        </aside>

        <section className="flex flex-col w-full bg-white-main">
          <Header />
          <Outlet />
        </section>
      </main>
    </React.StrictMode>
  );
}

export default ProfessorPage;
