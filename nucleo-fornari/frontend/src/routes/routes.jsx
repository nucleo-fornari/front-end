import Agenda from "../components/agenda/Agenda.jsx";
import Avisos from "../components/publicar/Avisos.jsx";
import Home from "../pages/site-institucional/Home.jsx";
import Formulario from "../pages/login/Formulario.jsx";
import ParentsPage from "../pages/responsavel/ResponsavelPage.jsx";
import Reuniao from "../components/dashboards/Reuniao.jsx";
import ProfessorPage from "../pages/professor/ProfessorPage.jsx";
import { createBrowserRouter } from "react-router-dom";
import { Inicio } from "../components/dashboards/Inicio.jsx";
import NotFound from "../pages/not-found/NotFound.jsx";
import PublicacoesProfessor from "../components/publicar/professor/PublicacoesProfessor.jsx";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../pages/unauthorized/Unauthorized.jsx"

//SECRETARIA
import SecretaryPage from "../pages/secretaria/SecretariaPage.jsx";
import ChamadosSecretaria from "../components/chamados/Chamados.jsx";
import Gerenciar from "../components/gerenciar/Gerenciar.jsx";
import GerenciarAluno from "../components/gerenciar/gerenciar-aluno/GerenciarAluno.jsx";
import GerenciarFuncionario from "../components/gerenciar/gerenciar-funcionario/GerenciarFuncionario.jsx";
import StickyHeadTable from "../components/dashboards/TabelaChamados.jsx";
import EscreverAvisos from "../components/publicar/secretaria/EscreverAvisos.jsx"
import FetchData from "../components/calendario/FetchData.jsx";
import CadastroFuncionario from "../components/gerenciar/gerenciar-funcionario/adicionar-funcionario/AdicionarFuncionario.jsx";
import CadastroAlunos from "../components/gerenciar/gerenciar-aluno/adicionar-aluno/novoAdicionarAluno.jsx";
import GerenciarSalas from "../components/gerenciar/gerenciar-salas/GerenciarSalas.jsx";
import EditarSala from "../components/gerenciar/gerenciar-salas/editar-sala/EditarSala.jsx";
import CadastroSala from "../components/gerenciar/gerenciar-salas/adicionar-sala/AdicionarSala.jsx";

const avisosData = [
  {
    titulo: "Encontro de Pais - 20/09",
    conteudo: "Sala G1A às 16:00",
    autor: "Viviane",
    dataCriacao: "Terça-Feira, 3 de Setembro",
  },
  {
    titulo: "Reunião Pedagógica - 25/09",
    conteudo: "Auditório Principal às 14:00",
    autor: "Carlos",
    dataCriacao: "Quarta-Feira, 20 de Setembro",
  },
  {
    titulo: "Festival de Ciências - 30/09",
    conteudo: "Ginásio às 10:00",
    autor: "Fernanda",
    dataCriacao: "Segunda-Feira, 15 de Setembro",
  },
  {
    titulo: "Aula Aberta de Artes - 05/10",
    conteudo: "Sala de Artes às 09:00",
    autor: "Juliana",
    dataCriacao: "Sexta-Feira, 1 de Outubro",
  },
  {
    titulo: "Palestra sobre Tecnologia - 10/10",
    conteudo: "Auditório às 13:00",
    autor: "Rafael",
    dataCriacao: "Segunda-Feira, 5 de Outubro",
  },
  {
    titulo: "Feira de Profissões - 20/10",
    conteudo: "Pátio Central às 15:00",
    autor: "Luciana",
    dataCriacao: "Quinta-Feira, 15 de Outubro",
  },
  {
    titulo: "Semana de Leitura - 25/10",
    conteudo: "Biblioteca durante o horário de aula",
    autor: "Marcos",
    dataCriacao: "Sexta-Feira, 20 de Outubro",
  },
];

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/login",
    element: <Formulario />,
  },
  {
    path: "/responsavel",
    element: (
      <PrivateRoute allowedRoles={["RESPONSAVEL"]}>
        <ParentsPage />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/responsavel",
        element: <Avisos avisosData={avisosData} />,
      },
      {
        path: "/responsavel/reunioes",
        element: <Reuniao />,
      },
      {
        path: "/responsavel/agenda",
        element: <Agenda />,
      },
    ],
  },
  {
    path: "/professor",
    element: (
      <PrivateRoute allowedRoles={["PROFESSOR"]}>
        <ProfessorPage />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/professor",
        element: <Inicio />,
      },
      {
        path: "/professor/publicacoes",
        element: <PublicacoesProfessor />,
      },
      {
        path: "/professor/chamados",
        element: <StickyHeadTable />,
      },
    ],
  },
  {
    path: "/secretaria",
    element: (
      <PrivateRoute allowedRoles={["SECRETARIO"]}>
        <SecretaryPage />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/secretaria",
        element: <ChamadosSecretaria />,
      },
      {
        path: "/secretaria/publicacao",
        element: <EscreverAvisos avisosData={avisosData} />,
      },
      {
        path: "/secretaria/calendario",
        element: <FetchData />,
      },
      {
        path: "/secretaria/gerencia",
        element: <Gerenciar />,
      },
      {
        path: "/secretaria/gerencia/aluno",
        element: <GerenciarAluno />,
      },
      {
        path: "/secretaria/gerencia/funcionario",
        element: <GerenciarFuncionario />,
      },
      {
        path: "/secretaria/cadastro/aluno",
        element: <CadastroAlunos />,
      },

      {
        path: "/secretaria/cadastro/funcionario",
        element: <CadastroFuncionario />
      },
      {
        path: "/secretaria/gerencia/salas",
        element: <GerenciarSalas />,
      },
      {
        path: "/secretaria/editar/salas",
        element: <EditarSala />
      },
      {
        path: "/secretaria/cadastro/sala",
        element: <CadastroSala />
      }
    ],
  },
]);
