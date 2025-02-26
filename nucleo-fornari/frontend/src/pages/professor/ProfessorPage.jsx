import React from "react";
import Header from "../../components/header/Header.jsx";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/side-menu/sideMenuView.jsx";

function ProfessorPage() {
  return (
    <React.StrictMode>
      <main className="flex">
        <aside className="lg:block md:hidden">
          <SideMenu professor={true} />
        </aside>

        <section className="flex flex-col w-full bg-white-main h-screen">
          <Header />
          <Outlet />
        </section>
      </main>
    </React.StrictMode>
  );
}

export default ProfessorPage;
