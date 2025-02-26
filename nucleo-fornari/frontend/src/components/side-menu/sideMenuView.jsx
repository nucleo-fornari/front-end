import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sideMenuView.css";

// APAGAR QUANDO FINALIZAR AS 3 PERSONAS NA APRESENTAÇÃO DA PAGINA
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
// ATÉ AQUI

// COMPONENTS:
import SingleButtonComponent from "./single-button/singleButtonComponent";
import SideMenuHeaderComponent from "./side-menu-header/sideMenuHeaderComponent";

// ICONS:
import chamadosIcon from "../../assets/imgs/chamadosIcon.svg";
import publicacoesIcon from "../../assets/imgs/publicacoesIcon.svg";
import gerenciarIcon from "../../assets/imgs/gerenciarIcon.svg";
import logoutIcon from "../../assets/imgs/logoutIcon.svg";
import MenuOpenIcon from "../../assets/imgs/menuOpenIcon.svg";

const SideMenu = ({ secretary, professor, parent, menuItens }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false);
  const [isParent, setIsParent] = useState(false);
  
  const navigate = useNavigate();
  // const { user, logout } = useAuth();

  const listenIsCollpased = (listen) => {
    setIsCollapsed(listen)
  }
  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    setIsExpanded(!isExpanded)
  };

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

      {professor && parent &&(<div
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
              {isExpanded && (
                <span class="lg:block ml-4 text-lg leading-4 font-semibold md:hidden">
                  {item.name}
                </span>
              )}
            </button>
          </Link>
        ))}
      </div>)}

      {isParent && isProfessor &&(<div className="flex lg:flex-col lg:justify-center lg:items-center lg:w-full lg:mb-72
      md:w-full md:justify-around">
        <button
          className="flex items-center w-full p-4 hover:bg-red-500"
        >
          <LogoutIcon />
          {isExpanded && (
            <span className="ml-4 text-lg font-semibold hidden sm:inline">
              Sair
            </span>
          )}
        </button>

        <div
        onClick={toggleMenu}
        className={`flex flex-row w-full justify-center items-center 
            `}
      >
        <button className="lg:block h-16 md:hidden">
          {isExpanded ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 0 }}
            >
              {/* <MenuOpenIcon sx={{ color: "white" }} /> */}
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 0 }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          )}
        </button>

        {isExpanded && (
        <span class="lg:block ml-4 text-lg leading-4 font-semibold md:hidden"> Recolher Menu</span>
        )}
      </div>
      </div>)}

      

    </div>
  );
};

export default SideMenu;
