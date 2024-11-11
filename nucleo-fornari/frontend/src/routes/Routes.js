import Agenda from '../components/Dashboards/Agenda';
import Avisos from '../components/Dashboards/Avisos';
import Home from '../views/home/home';
import Formulario from '../components/Login/Formulario';
import ParentsPage from '../views/parents/parentsView';
import Reuniao from '../components/Dashboards/Reuniao';
import ProfessorPage from '../views/professor/professorView';
import {createBrowserRouter} from 'react-router-dom';
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


const avisosData = [
  {
      titulo: "Encontro de Pais - 20/09",
      conteudo: "Sala G1A às 16:00",
      autor: "Viviane",
      dataCriacao: "Terça-Feira, 3 de Setembro"
  },
  {
      titulo: "Reunião Pedagógica - 25/09",
      conteudo: "Auditório Principal às 14:00",
      autor: "Carlos",
      dataCriacao: "Quarta-Feira, 20 de Setembro"
  },
  {
      titulo: "Festival de Ciências - 30/09",
      conteudo: "Ginásio às 10:00",
      autor: "Fernanda",
      dataCriacao: "Segunda-Feira, 15 de Setembro"
  },
  {
      titulo: "Aula Aberta de Artes - 05/10",
      conteudo: "Sala de Artes às 09:00",
      autor: "Juliana",
      dataCriacao: "Sexta-Feira, 1 de Outubro"
  },
  {
      titulo: "Palestra sobre Tecnologia - 10/10",
      conteudo: "Auditório às 13:00",
      autor: "Rafael",
      dataCriacao: "Segunda-Feira, 5 de Outubro"
  },
  {
      titulo: "Feira de Profissões - 20/10",
      conteudo: "Pátio Central às 15:00",
      autor: "Luciana",
      dataCriacao: "Quinta-Feira, 15 de Outubro"
  },
  {
      titulo: "Semana de Leitura - 25/10",
      conteudo: "Biblioteca durante o horário de aula",
      autor: "Marcos",
      dataCriacao: "Sexta-Feira, 20 de Outubro"
  }
];

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
        element: <Avisos avisosData={avisosData}/>
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
        element:<Avisos avisosData={avisosData}/>
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


