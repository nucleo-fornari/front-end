import React from 'react';
import "./gerencia.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Publication = () => {
    return (
        <div class='gerencia-usuarios'>

            <Link
                to={'/secretaria/gerencia/aluno'}
            >
                <div class='gerencia-alunos-funcionarios'>
                    <AccountCircleIcon style={{ fontSize: 300, color: '#3285fa' }} />
                    <span class=''>
                        ALUNOS
                    </span>
                </div>
            </Link>

            <Link
                to={'/secretaria/gerencia/funcionario'}
            >
                <div class='gerencia-alunos-funcionarios'>
                    <AccountCircleIcon style={{ fontSize: 300, color: '#3285fa' }} />
                    <span class=''>
                        FUNCIONARIOS
                    </span>
                </div>
            </Link>

        </div>
    );
};

export default Publication;