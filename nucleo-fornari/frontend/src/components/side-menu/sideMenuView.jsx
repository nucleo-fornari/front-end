import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sideMenuView.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

const SideMenu = ({ menuItens }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const location = useLocation();

  return (
    <div
      className={` lg:h-full md:h-32 flex flex-col items-center lg:justify-normal md:justify-center sm:justify-center transition-all duration-700 ease-out bg-blue-dash text-white-ice sm:w-full md:w-full 
        ${isExpanded ? "lg:w-64" : "lg:w-20"}
        `}
    >
      <div
        className={`flex flex-row w-full justify-center items-center 
            `}
      >
        <button onClick={toggleMenu} className="lg:block h-16 md:hidden">
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
      </div>
      {isExpanded && (
        <h2 className="lg:block md:hidden text-white my-8">
          Olá,{" "}
          {sessionStorage.NOME && sessionStorage.NOME.length > 3
            ? sessionStorage.NOME
            : "user"}
          !{" "}
        </h2>
      )}

      <hr />

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
              class="flex lg:items-center lg:flex-row lg:w-full pl-8 pr-4 py-6"
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
          onClick={handleLogout}
          className="flex items-center w-full p-4 hover:bg-red-500"
        >
          <LogoutIcon />
          {isExpanded && (
            <span className="ml-4 text-lg font-semibold hidden sm:inline">
              Sair
            </span>
          )}
        </button>
      </div>

    </div>
  );
};

export default SideMenu;
