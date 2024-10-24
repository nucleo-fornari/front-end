import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./sideMenuView.css";
import Logo from "../../assets/icons/logo-branco.png"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const SideMenu = ({menuItens}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    const location = useLocation();

    return (
        <div class={`side-menu ${isExpanded ? 'expanded' : 'collapsed'}`}
        >

            <div class="containner-usuario">
                <div class={`containner-logo ${isExpanded ? 'expanded' : 'collapsed'}`}>

                    <img
                        src={Logo}
                        alt="Project"
                        class={`img-logo ${isExpanded ? 'expanded' : 'collapsed'}`}
                    />
                    <button
                        onClick={toggleMenu}
                        class="btn-espande"
                    >
                        {isExpanded ? <MenuOpenIcon sx={{ color: 'white' }}/> : <MenuIcon sx={{ color: 'white' }}/>}
                    </button>
                </div>

                {isExpanded && <h2 className="text-white mt-10">Olá, Nome do Usuário</h2>}
            </div>

            <hr />

            <div class="containner-btns-route">
                {menuItens.map((item, index) => (
                    <Link
                    key={index}
                    to={item.route}
                    className={`w-full ${location.pathname === item.route ? 'bg-blue-pastel' : ''} hover:bg-blue-pastel`}
                    >
                        <button key={index} class="btn-route">
                            {item.icon}
                            {isExpanded && <span class="text-route">{item.name}</span>}
                        </button>
                    </Link> 
                ))}
            </div>
        </div>
    );
};

export default SideMenu;
