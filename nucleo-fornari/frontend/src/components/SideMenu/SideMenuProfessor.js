import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideMenuItem from './SideMenuItem';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import InboxIcon from '@mui/icons-material/Inbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

            <div className="my-4 flex flex-col items-center mb-20">
                <div className="flex items-center justify-between w-full">

                    {isExpanded && (
                        <div className="flex-grow flex justify-center">
                            <AccountCircleIcon sx={{ fontSize: 100 }} />
                        </div>
                    )}

                    <button
                        onClick={toggleMenu}
                        className="ml-2 mb-4 p-2 text-white bg-blue-pastel hover:bg-blue-main rounded-full transition-colors h-10 w-10 flex items-center justify-center"
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

            {isExpanded && <Link to="/professor">
                <SideMenuItem
                    titulo="Publicações"
                    icone={<NewspaperRoundedIcon />}
                />
            </Link>}

            {isExpanded && <Link to="/responsavel/reunioes">
                <SideMenuItem
                    titulo="Chamados"
                    icone={<InboxIcon />}
                />
            </Link>}

            {isExpanded && <Link to="/responsavel/agenda">
                <SideMenuItem
                    titulo="Calendário"
                    icone={<CalendarMonthIcon />}
                />
            </Link>}

            {isExpanded && <Link>
                <SideMenuItem
                    titulo="Relatórios"
                    icone={<DescriptionIcon />}
                />
            </Link>}
        </div>

    );

};

export default SideMenu;