import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { FaRegNewspaper, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const SideMenu = () => {
    const [isExpanded, setIsExpanded] = useState(true); // Controle de expansão/contração do menu

    const toggleMenu = () => {
        setIsExpanded(!isExpanded); // Alterna entre expandido e contraído
    };

    const menuItems = [
        { icon: '', text: 'Publicações', route: '/publicacoes' },
        // { icon: <FaUsers className="text-2xl" />, text: 'Reuniões', route: '/reunioes' },
        // { icon: <FaCalendarAlt className="text-2xl" />, text: 'Agenda', route: '/agenda' }
    ];

    return (
        <div className={`h-screen bg-white-main  ${isExpanded ? 'w-64' : 'w-20'} transition-width duration-300 left-0 top-0 flex flex-col items-center`}>

            <div className="my-4 flex flex-col items-center">
                <div className='flex flex-row'>

                    <img
                        src=""
                        alt="User/Project"
                        className={`rounded-full ${isExpanded ? 'w-24 h-24' : 'w-10 h-10'} transition-all duration-300`}
                    />
                    <button
                        onClick={toggleMenu}
                        className="mb-4 p-2 text-white bg-blue-pastel hover:bg-blue-main rounded-full transition-colors h-10"
                    >
                        {isExpanded ? '<' : '>'}
                    </button>
                </div>

                {isExpanded && <h2 className="text-white mt-2">Nome do Usuário</h2>}
            </div>

            {/* <nav className="mt-10 flex-grow flex flex-col justify-center items-center w-full">
                {menuItems.map((item, index) => (
                    <Link to={item.route} key={index} className="w-full">
                        <button className="flex items-center w-full px-4 py-3 my-2 text-white hover:text-blue-main">
                            {item.icon}
                            {isExpanded && <span className="ml-4 text-lg">{item.text}</span>}
                        </button>
                    </Link>
                ))}
            </nav> */}

            {/* Lista de botões de navegação */}
            <nav className="mt-10 flex-grow flex flex-col justify-center items-center">

                <Link to="/responsavel">
                    <button className="flex items-center w-full px-4 py-3 my-2 hover:bg-purple-pastel text-white">
                        {/* <FaRegNewspaper className="text-2xl" /> */}
                        {isExpanded && <span className="ml-4 text-lg">Publicações</span>}
                    </button></Link>

                <Link to="/responsavel/reunioes">
                    <button className="flex items-center w-full px-4 py-3 my-2 hover:bg-purple-pastel text-white">
                        {/* <FaUsers className="text-2xl" /> */}
                        {isExpanded && <span className="ml-4 text-lg">Reuniões</span>}
                    </button>
                </Link>

                <Link to="/responsavel/agenda">
                    <button className="flex items-center w-full px-4 py-3 my-2 hover:bg-purple-pastel text-white">
                        {/* <FaCalendarAlt className="text-2xl" /> */}
                        {isExpanded && <span className="ml-4 text-lg">Agenda</span>}
                    </button>
                </Link>


            </nav>
        </div>
    );
};

export default SideMenu;
