import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/side-menu/sideMenuView.jsx";
import './ProfessorPage.css'

function ProfessorPage() {

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
      <main className={`container-professor-page ${isMobile ? 'container-professor-page-mobile' : ''}`}>
        <aside className="lg:block">
          <SideMenu isMobile={isMobile} professor={true} />
        </aside>

        <section className="flex flex-col w-full bg-white-main h-screen">
          <Outlet />
        </section>
      </main>
    </React.StrictMode>
  );
}

export default ProfessorPage;
