import React from "react";
import Header from "../../components/Dashboards/Header";
import { Outlet } from "react-router-dom";
import SideMenuProfessor from "../../components/SideMenu/SideMenuProfessor";


function ProfessorPage() {
  return (
    <React.StrictMode>
      <main className="flex">
        <aside>
        <SideMenuProfessor/>
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
