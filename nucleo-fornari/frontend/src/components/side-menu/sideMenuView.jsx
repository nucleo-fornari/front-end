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
import publicationIcon from "../../assets/imgs/publicationIcons.svg";
import meetingIcon from "../../assets/imgs/meetingIcon.svg";
import avaliacaoIcon from "../../assets/imgs/avaliacaoIcon.svg"

const SideMenu = ({ secretary, professor, parent, isMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const { user, logout } = useAuth();

  const listenIsCollpased = (listen) => {
    setIsCollapsed(listen)
  }

  return (
      <div className={`side-menu-component__container ${isMobile ? 'side-menu-component__container--expanded-mobile' : ''}
        ${isCollapsed && !isMobile ? "side-menu-component__container--collapsed" : "side-menu-component__container--expanded"}`
      }
      >
        {!isMobile && (
            <>
              <SideMenuHeaderComponent
                  userName={sessionStorage.NOME}
                  isCollapsed={isCollapsed}
              />
              <hr className={`side-menu__divider`} />
            </>
        )}

        {secretary && (
            <div className={`${isMobile ? 'container-buttons-mobile' : ''}`}>
              <SingleButtonComponent
                  btnIcon={chamadosIcon}
                  btnText={"Chamados"}
                  activeRoute={["/secretaria"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  navigateUrl={"/secretaria"}
              />

              <SingleButtonComponent
                  btnIcon={publicacoesIcon}
                  btnText={"Publicações"}
                  activeRoute={["/secretaria/publicacao"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
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
                  isMobile={isMobile}
                  navigateUrl={"/secretaria/gerencia"}
              />
            </div>
        )}

        {professor && (
            <div className={`${isMobile ? 'container-buttons-mobile' : ''}`}>
              <SingleButtonComponent
                  btnIcon={calendarIcon}
                  btnText={"Calendário"}
                  activeRoute={["/professor"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  navigateUrl={"/professor"}
              />

              <SingleButtonComponent
                  btnIcon={publicationIcon}
                  btnText={"Publicações"}
                  activeRoute={["/professor/publicacoes"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  navigateUrl={"/professor/publicacoes"}
              />

              <SingleButtonComponent
                  btnIcon={chamadosIcon}
                  btnText={"Chamados"}
                  activeRoute={["/professor/chamados"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  navigateUrl={"/professor/chamados"}
              />

                <SingleButtonComponent
                    btnIcon={meetingIcon}
                    btnText={"Reuniões"}
                    activeRoute={["/professor/reunioes"]}
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    navigateUrl={"/professor/reunioes"}
                />
                <SingleButtonComponent
                  btnIcon={avaliacaoIcon}
                  btnText={"Avaliações"}
                  activeRoute={["/professor/avaliacoes"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  navigateUrl={"/professor/avaliacoes"}
              />
            </div>
        )}

        {parent && (
            <div className={`${isMobile ? 'container-buttons-mobile' : ''}`}>
              <SingleButtonComponent
                  btnIcon={publicacoesIcon}
                  btnText={"Agenda"}
                  activeRoute={["/responsavel"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  navigateUrl={"/responsavel"}
              />

              <SingleButtonComponent
                  btnIcon={meetingIcon}
                  btnText={"Reuniões"}
                  activeRoute={["/responsavel/reunioes"]}
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  navigateUrl={"/responsavel/reunioes"}
              />
            </div>
        )}

        {!isMobile && (
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
        )}

      </div>
  );
};

export default SideMenu;
