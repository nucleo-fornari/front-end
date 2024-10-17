import React from "react";
import SideMenu from "../../components/SideMenu/SideMenuProfessor";
import Header from "../../components/Dashboards/Header";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import AlignItemsList from "../../components/Dashboards/professor/ListaLateral";
import Titulo from "../../components/Dashboards/Titulo";
import Agenda from "../../components/Dashboards/Agenda";


function ProfessorPage() {
  return (
    <React.StrictMode>
      <main className="flex">
        <aside>
          <SideMenu />
        </aside>

        <section className="flex flex-col w-full">
          <Header />
          <Outlet />

          <section className="flex">
            <Agenda />
            <div className="w-64 text-blue-main">
              <Button
                startIcon={<SupportAgentRoundedIcon />}
                fontSize="inherit"
                color=""
              >
                {" "}
                Abrir chamado
              </Button>
            </div>
            <div>
              <Titulo titulo="Sala:{nomeSala}" />
              <AlignItemsList />
            </div>
            
          </section>
        </section>
      </main>
    </React.StrictMode>
  );
}

export default ProfessorPage;
