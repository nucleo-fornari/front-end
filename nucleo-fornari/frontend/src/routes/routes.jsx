import Agenda from "../components/agenda/Agenda.jsx";
import Avisos from "../components/publicacoes/Avisos.jsx";
import Home from "../pages/site-institucional/Home";
import Formulario from "../pages/login/Formulario";
import ParentsPage from "../pages/responsavel/ResponsavelPage";
import Reuniao from "../components/dashboards/Reuniao.jsx";
import ProfessorPage from "../pages/professor/ProfessorPage";
import { createBrowserRouter } from "react-router-dom";
import { Inicio } from "../components/dashboards/Inicio";
import NotFound from "../pages/not-found/NotFound";

//SECRETARIA
import Calendario from "../components/calendario/Calendario.jsx";
import SecretaryPage from "../pages/secretaria/SecretariaPage";
import ChamadosSecretaria from "../components/chamados/Chamados";
import Gerenciar from "../components/gerenciar/Gerenciar.jsx";
import GerenciarAluno from "../components/gerenciar/gerenciar-aluno/GerenciarAluno.jsx";
import GerenciarFuncionario from "../components/gerenciar/gerenciar-funcionario/GerenciarFuncionario.jsx";
import AdicionarAluno from "../components/gerenciar/gerenciar-aluno/adicionar-aluno/AdicionarAluno.jsx";
import StickyHeadTable from "../components/dashboards/TabelaChamados.jsx";
import FetchData from "../components/calendario/FetchData.jsx";

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
    path: "/login",
    element: <Formulario />,
  },
  {
    path: "/responsavel",
    element: <ParentsPage />,
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
    element: <ProfessorPage />,
    children: [
      {
        path: "/professor",
        element: <Inicio />,
      },
      {
        path: "/professor/calendario",
        element: <Inicio />,
      },
      {
        path: "/professor/publicacoes",
        element: <Avisos avisosData={avisosData} />,
      },
      {
        path: "/professor/chamados",
        element: <StickyHeadTable />,
      },
    ],
  },
  {
    path: "/secretaria",
    element: <SecretaryPage />,
    children: [
      {
        path: "/secretaria",
        element: <ChamadosSecretaria />,
      },
      {
        path: "/secretaria/publicacao",
        element: <Avisos avisosData={avisosData} />,
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
        element: <AdicionarAluno />,
      },
    ],
  },
]);
