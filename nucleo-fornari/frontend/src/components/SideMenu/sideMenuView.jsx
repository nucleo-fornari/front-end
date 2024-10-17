import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./sideMenuView.css";

const SideMenu = ({menuItens}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div class={`side-menu ${isExpanded ? 'expanded' : 'collapsed'}`}
        // {`h-screen bg-white-main  ${isExpanded ? 'w-64' : 'w-20'} transition-width duration-300 left-0 top-0 flex flex-col items-center`}
        >

            <div class="containner-usuario">
                <div class='containner-logo'>

                    <img
                        src=""
                        alt="User/Project"
                        className={`rounded-full ${isExpanded ? 'w-24 h-24' : 'w-10 h-10'} transition-all duration-300`}
                    />
                    <button
                        onClick={toggleMenu}
                        class="btn-espande"
                    >
                        {isExpanded ? '|<' : '>|'}
                    </button>
                </div>

                {isExpanded && <h2 className="text-white mt-2">Nome do Usuário</h2>}
            </div>

            <hr />

            <div class="containner-btns-route">
                {menuItens.map((item, index) => (
                    <Link
                    key={index}
                    to={item.route}
                    className="w-full"
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
