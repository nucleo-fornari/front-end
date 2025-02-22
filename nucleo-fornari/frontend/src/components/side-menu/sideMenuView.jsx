import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sideMenuView.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import SingleButtonComponent from "./single-button/singleButtonComponent";
import clipBoardList from "../../assets/imgs/clipBoardList.svg"
import book from "../../assets/imgs/book.svg"

const SideMenu = ({ menuItens }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  // const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    setIsExpanded(!isExpanded)
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/login")
  }

  const location = useLocation();

  return (
    <div 
      className={
        `side-menu-component__container 
        ${isCollapsed ? "side-menu-component__container--collapsed" : "side-menu-component__container--expanded"}`
      }
    >
      
      {!isCollapsed && (
        <h2 className="lg:block md:hidden text-white my-8">
          Olá,{" "}
          {sessionStorage.NOME && sessionStorage.NOME.length > 3
            ? sessionStorage.NOME
            : "user"}
          !{" "}
        </h2>
      )}

      <hr className={`side-nav__divider`} />

      <SingleButtonComponent
        btnIcon={clipBoardList}
        btnText={"Chamados"}
        activeRoute={"/secretaria"}
        isCollapsed={isCollapsed}
        navigateUrl={"/secretaria"}
      />

      <SingleButtonComponent
        btnIcon={book}
        btnText={"Publicações"}
        activeRoute={"/secretaria/publicacao"}
        isCollapsed={isCollapsed}
        navigateUrl={"/secretaria/publicacao"}
      />

      <div
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
      </div>

      <div className="flex lg:flex-col lg:justify-center lg:items-center lg:w-full lg:mb-72
      md:w-full md:justify-around">
        <button
          onClick={() => logout()}
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
              <MenuOpenIcon sx={{ color: "white" }} />
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
      </div>

      

    </div>
  );
};

export default SideMenu;
