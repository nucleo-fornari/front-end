import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "../../components/header/Header.jsx";
import SideMenu from "../../components/side-menu/sideMenuView.jsx";


function ParentsPage() {

  return (
    <React.StrictMode>

      <main className='flex'>
        <aside className="lg:block md:hidden">
          <SideMenu parent={true}/>
        </aside>

        <section className="flex flex-col w-full h-screen">
          <Header />
          <Outlet />
        </section>
      </main>

    </React.StrictMode>
  );


}

export default ParentsPage;
