import { createBrowserRouter } from 'react-router-dom';
import Agenda from '../components/agenda/Agenda.jsx';
import { Inicio } from '../components/dashboards/Inicio.jsx';
import Reuniao from '../components/dashboards/Reuniao.jsx';
import PublicacoesProfessor from '../components/publicar/professor/PublicacoesProfessor.jsx';
import Formulario from '../pages/login/Formulario.jsx';
import NotFound from '../pages/not-found/NotFound.jsx';
import Home from '../pages/site-institucional/Home.jsx';
import PrivateRoute from "./PrivateRoute";
import Unauthorized from '../pages/unauthorized/Unauthorized.jsx';

//SECRETARIA
import FetchData from '../components/calendario/FetchData.jsx';
import ChamadosSecretaria from '../components/chamados/Chamados.jsx';
import StickyHeadTable from '../components/dashboards/TabelaChamados.jsx';
import Gerenciar from '../components/gerenciar/Gerenciar.jsx';
import GerenciarAluno from '../components/gerenciar/gerenciar-aluno/GerenciarAluno.jsx';
import CadastroAlunos from '../components/gerenciar/gerenciar-aluno/adicionar-aluno/novoAdicionarAluno.jsx';
import GerenciarFuncionario from '../components/gerenciar/gerenciar-funcionario/GerenciarFuncionario.jsx';
import CadastroFuncionario from '../components/gerenciar/gerenciar-funcionario/adicionar-funcionario/AdicionarFuncionario.jsx';
import GerenciarSalas from '../components/gerenciar/gerenciar-salas/GerenciarSalas.jsx';
import CadastroSala from '../components/gerenciar/gerenciar-salas/adicionar-sala/AdicionarSala.jsx';
import EditarSala from '../components/gerenciar/gerenciar-salas/editar-sala/EditarSala.jsx';
import EscreverAvisos from '../components/publicar/secretaria/EscreverAvisos.jsx';
import Autenticacao from '../pages/login/Autenticacao.jsx';
import ChangePassword from '../pages/login/ChangePassword.jsx';
import Login from '../pages/login/Login.jsx';
import PasswordRecovery from '../pages/login/PasswordRecovery.jsx';
import Avaliacoes from "../pages/avaliacoes/Avaliacoes";
import PedidosReuniaoPorSala from '../components/dashboards/PedidosReuniaoPorSala.jsx';
import CadastroResponsavel from '../components/gerenciar/adicionar-responsavel/AdicionarResponsavel.jsx';
import CadastroFuncionarios from '../pages/secretaria/gerenciar-funcionario/cadastrar-funcionario/CadastroFuncionario.jsx';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      {
        path: '/login',
        element: <Formulario />,
      },
      {
        path: '/login/recuperacao-senha',
        element: <PasswordRecovery />,
      },
      {
        path: '/login/recuperacao-senha/autenticacao',
        element: <Autenticacao />,
      },
      {
        path: '/login/recuperacao-senha/alterar-senha',
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: '/responsavel',
    element: <PrivateRoute allowedRoles={['RESPONSAVEL']} />,
    children: [
      {
        path: '/responsavel/reunioes',
        element: <Reuniao />,
      },
      {
        path: '/responsavel',
        element: <Agenda />,
      },
    ],
  },
  {
    path: '/professor',
    element: <PrivateRoute allowedRoles={['PROFESSOR']} />,
    children: [
      {
        path: '/professor',
        element: <Inicio />,
      },
      {
        path: '/professor/publicacoes',
        element: <PublicacoesProfessor />,
      },
      {
        path: '/professor/chamados',
        element: <StickyHeadTable />,
      },
      {
        path: '/professor/reunioes',
        element: <PedidosReuniaoPorSala />,
      },
      {
        path: '/professor/avaliacoes',
        element: <Avaliacoes/>
      }
    ],
  },
  {
    path: '/secretaria',
    element: <PrivateRoute allowedRoles={['SECRETARIO']} />,
    children: [
      {
        path: '/secretaria',
        element: <ChamadosSecretaria />,
      },
      {
        path: '/secretaria/funcionario/cadastro',
        element: <CadastroFuncionarios />,
      },
      {
        path: '/secretaria/publicacao',
        element: <EscreverAvisos/>,
      },
      {
        path: '/secretaria/calendario',
        element: <FetchData />,
      },
      {
        path: '/secretaria/gerencia',
        element: <Gerenciar />,
      },
      {
        path: '/secretaria/gerencia/aluno',
        element: <GerenciarAluno />,
      },
      {
        path: '/secretaria/gerencia/funcionario',
        element: <GerenciarFuncionario />,
      },
      {
        path: '/secretaria/cadastro/aluno',
        element: <CadastroAlunos />,
      },
      {
        path: '/secretaria/cadastro/responsavel/:idAluno',
        element: <CadastroResponsavel />
      },
      {
        path: '/secretaria/cadastro/funcionario',
        element: <CadastroFuncionario />,
      },
      {
        path: '/secretaria/gerencia/salas',
        element: <GerenciarSalas />,
      },
      {
        path: '/secretaria/editar/salas',
        element: <EditarSala />,
      },
      {
        path: '/secretaria/cadastro/sala',
        element: <CadastroSala />,
      },
    ],
  },
]);
