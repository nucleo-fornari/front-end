import Agenda from '../components/Dashboards/Agenda';
import Avisos from '../components/Dashboards/Avisos';
import Home from '../views/home/home';
import Formulario from '../components/Login/Formulario';
import ParentsPage from '../views/parents/parentsView';
import Reuniao from '../components/Dashboards/Reuniao';
import ProfessorPage from '../views/professor/professorView';
import {createBrowserRouter, Navigate } from 'react-router-dom';
import { Inicio } from '../components/Dashboards/professor/Inicio';
import AvisosAlunos from '../components/Dashboards/AvisosAlunos'

//SECRETARIA
import SecretaryPage from '../views/secretary/SecretaryView';
import ChamadosSecretaria from '../components/chamadosSecretaria/ChamadosSecretaria';
import PublicacaoSecretaria from '../components/publicacaoSecretaria/PublicacaoSecretaria';
import CalendarioSecretaria from '../components/calendarioSecretaria/CalendarioSecretaria';
import Gerencia from '../components/gerencia/Gerencia';
import NotFound from '../components/NotFound/NotFound';
import GerenciaAluno from '../components/gerencia/gerenciaAluno/GerenciaAluno';
import GerenciaFuncionario from '../components/gerencia/gerenciaFuncionario/GerenciaFuncionario';
import CadastroAluno from '../components/gerencia/gerenciaAluno/adicionarAluno/AdicionarAluno';
import StickyHeadTable from '../components/Dashboards/professor/TabelaChamados';

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/", 
    element: <Home/>
  },
  {
    path: "/login",
    element: <Formulario />
  },
  {
    path: "/responsavel",
    element: <ParentsPage/>,
    children: [
      {
        path: "/responsavel",
        element: <Avisos/>
      },
      {
        path: "/responsavel/reunioes",
        element: <Reuniao/>
      },
      {
        path: "/responsavel/agenda",
        element: <AvisosAlunos/>
      },
    ]
  },
  {
    path: "/professor",
    element:<ProfessorPage/>,
    children: [
      {
        path:"/professor",
        element: <Inicio/>
      },
      {
      path:"/professor/calendario",
        element: <Inicio/>
      },
      {
        path: "/professor/publicacoes",
        element:<Avisos/>
      },
      {
        path:"/professor/chamados",
        element: <StickyHeadTable/>
      }
      
    ]
  },
  {
    path: "/secretaria",
    element: <SecretaryPage/>,
    children: [
      {
        path: "/secretaria",
        element: <ChamadosSecretaria/>
      },
      {
        path: "/secretaria/publicacao",
        element: <Avisos/>
      },
      {
        path: "/secretaria/calendario",
        element: <CalendarioSecretaria/>
      },
      {
        path: "/secretaria/gerencia",
        element: <Gerencia/>
      },
      {
        path: "/secretaria/gerencia/aluno",
        element: <GerenciaAluno/>
      },
      {
        path: "/secretaria/gerencia/funcionario",
        element: <GerenciaFuncionario/>
      },
      {
        path: "/secretaria/cadastro/aluno",
        element: <CadastroAluno/>
      },
    ]
  },
])


