import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import SideMenu from "../../components/side-menu/sideMenuView.jsx";
import './ResponsavelPage.css'

function ParentsPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.StrictMode>
      <main className={`container-parent-page ${isMobile ? 'container-parent-page-mobile' : ''}`}>
        <aside className="lg:block">
          <SideMenu isMobile={isMobile} parent={true}/>
        </aside>
        <section className="flex flex-col w-full h-screen">
          <Outlet />
        </section>
      </main>
    </React.StrictMode>
  );


}

export default ParentsPage;
