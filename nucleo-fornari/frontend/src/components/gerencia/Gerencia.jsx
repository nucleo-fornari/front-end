import React from 'react';
import "./gerencia.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Gerencia = () => {

    const usuariosGerenciaveis = [
        {
            route: '/secretaria/gerencia/aluno',
            name: 'ALUNOS',
        },
        {
            route: '/secretaria/gerencia/funcionario',
            name: 'FUNCIONARIOS',
        },
    ]
    return (
        <div class='gerencia-usuarios'>
            {usuariosGerenciaveis.map((item, index) => (
                <Link
                key={index}
                to={item.route}
                >
                <div class='gerencia-alunos-funcionarios'>
                    <AccountCircleIcon style={{ fontSize: 300, color: '#3285fa' }} />
                    <span key={index} class='gerencia-text'>
                        {item.name}
                    </span>
                </div>
            </Link> 
            ))}
        </div>
    );
};

export default Gerencia;