import React from "react";
import "./parentsView.css";
import { BrowserRouter as Router, Route, Switch, Redirect, Outlet, Link } from 'react-router-dom';
import Header from "../../components/Dashboards/Header.js";
import SideMenu from "../../components/SideMenu/SideMenuParents.js";



function ParentsPage() {
  return (
    <React.StrictMode>

      <main className='flex'>


        <aside >

          <SideMenu/>


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
