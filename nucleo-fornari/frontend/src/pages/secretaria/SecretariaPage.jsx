import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/side-menu/sideMenuView";

function SecretaryPage() {
  return (
    <React.StrictMode>
      <main className="flex">
        <aside className="lg:block md:hidden">
          <SideMenu secretary={true}/>
        </aside>
        <section className="flex flex-col w-full h-screen">
          <Outlet />
        </section>
      </main>
    </React.StrictMode>
  );
}

export default SecretaryPage;
