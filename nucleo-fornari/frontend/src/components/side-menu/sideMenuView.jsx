import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sideMenuView.css";

// COMPONENTS:
import SingleButtonComponent from "./single-button/singleButtonComponent";
import SideMenuHeaderComponent from "./side-menu-header/sideMenuHeaderComponent";

// ICONS:
import chamadosIcon from "../../assets/imgs/chamadosIcon.svg";
import publicacoesIcon from "../../assets/imgs/publicacoesIcon.svg";
import gerenciarIcon from "../../assets/imgs/gerenciarIcon.svg";
import logoutIcon from "../../assets/imgs/logoutIcon.svg";
import MenuOpenIcon from "../../assets/imgs/menuOpenIcon.svg";
import calendarIcon from "../../assets/imgs/calendarIcon.svg";
import publicationIcon from "../../assets/imgs/publicationIcons.svg"
import meetingIcon from "../../assets/imgs/meetingIcon.svg"

const SideMenu = ({ secretary, professor, parent, menuItens }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const { user, logout } = useAuth();

  const listenIsCollpased = (listen) => {
    setIsCollapsed(listen)
  }

  const location = useLocation();

  return (
    <div className={`side-menu-component__container 
        ${isCollapsed ? "side-menu-component__container--collapsed" : "side-menu-component__container--expanded"}`
      }
    >      
      <SideMenuHeaderComponent
      userName={sessionStorage.NOME}
      isCollapsed={isCollapsed}
      />

      <hr className={`side-menu__divider`} />

      {secretary && (
        <div>
          <SingleButtonComponent
            btnIcon={chamadosIcon}
            btnText={"Chamados"}
            activeRoute={["/secretaria"]}
            isCollapsed={isCollapsed}
            navigateUrl={"/secretaria"}
          />

          <SingleButtonComponent
            btnIcon={publicacoesIcon}
            btnText={"Publicações"}
            activeRoute={["/secretaria/publicacao"]}
            isCollapsed={isCollapsed}
            navigateUrl={"/secretaria/publicacao"}
          />

          <SingleButtonComponent
            btnIcon={gerenciarIcon}
            btnText={"Gerenciar"}
            activeRoute=
            {[
              "/secretaria/gerencia", 
              "/secretaria/gerencia/aluno",
              "/secretaria/cadastro/aluno",
              "/secretaria/gerencia/funcionario",
              "/secretaria/cadastro/funcionario",
              "/secretaria/gerencia/salas",
              "/secretaria/editar/salas",
              "/secretaria/cadastro/sala",
            ]}
            isCollapsed={isCollapsed}
            navigateUrl={"/secretaria/gerencia"}
          />
        </div>
      )}

      {professor && (
        <div>
          <SingleButtonComponent
            btnIcon={calendarIcon}
            btnText={"Calendário"}
            activeRoute={["/professor"]}
            isCollapsed={isCollapsed}
            navigateUrl={"/professor"}
          />

          <SingleButtonComponent
            btnIcon={publicationIcon}
            btnText={"Publicações"}
            activeRoute={["/professor/publicacoes"]}
            isCollapsed={isCollapsed}
            navigateUrl={"/professor/publicacoes"}
          />

          <SingleButtonComponent
            btnIcon={chamadosIcon}
            btnText={"Chamados"}
            activeRoute={["/professor/chamados"]}
            isCollapsed={isCollapsed}
            navigateUrl={"/professor/chamados"}
          />
        </div>
      )}

      {parent && (
        <div>
          <SingleButtonComponent
            btnIcon={publicacoesIcon}
            btnText={"Agenda"}
            activeRoute={["/responsavel"]}
            isCollapsed={isCollapsed}
            navigateUrl={"/responsavel"}
          />

        <SingleButtonComponent
            btnIcon={meetingIcon}
            btnText={"Reuniões"}
            activeRoute={["/responsavel/reunioes"]}
            isCollapsed={isCollapsed}
            navigateUrl={"/responsavel/reunioes"}
          />
        </div>
      )}
      <div className={'side-menu__footer'}>
        <SingleButtonComponent
          btnIcon={logoutIcon}
          btnText={"Sair"}
          isCollapsed={isCollapsed}
          event={"logout"}
        />
        <SingleButtonComponent
          btnIcon={MenuOpenIcon}
          btnText={"Recolher Menu"}
          isCollapsed={isCollapsed}
          event={"toggleMenu"}
          emit={listenIsCollpased}
        />
      </div>

      {!parent &&(<div
        class="flex lg:flex-col lg:justify-center lg:items-center lg:w-full lg:mb-72
      md:w-full md:justify-around "
      >
        {menuItens.map((item, index) => (
          <Link
            key={index}
            to={item.route}
            className={`lg:w-full md:w-20 md:h-full ${location.pathname === item.route ? "bg-blue-pastel" : ""
              } hover:bg-blue-pastel`}
          >
            <button
              key={index}
              class="flex lg:items-center lg:flex-row lg:w-full pl-8 pr-4 py-6 md:text-2xl"
            >
              {item.icon}
            </button>
          </Link>
        ))}
      </div>)}
    </div>
  );
};

export default SideMenu;
