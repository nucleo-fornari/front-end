import React from 'react';
import SideMenu from '../../components/SideMenu/SideMenuProfessor';
import Header from '../../components/Dashboards/Header';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

function ProfessorPage() {
  return (
    <React.StrictMode>

      <main className='flex'>

        <aside>
          <SideMenu />
        </aside>

        <section className='flex flex-col w-full'>
          <Header />
          <Outlet />
          <section className='w-64'>
            <Button startIcon={<SupportAgentRoundedIcon />} fontSize='inherit' color=''> Abrir chamado</Button>
          </section>
        </section>




      </main>

    </React.StrictMode>
  );
}

export default ProfessorPage;