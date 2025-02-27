import React from 'react';
import "./Gerenciar.css";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import HeaderBar from '../header-bar/headerBar';

const Gerenciar = () => {

    const usuariosGerenciaveis = [
        {
            route: '/secretaria/gerencia/aluno',
            name: 'ALUNOS',
        },
        
        {
            route: '/secretaria/gerencia/salas',
            name: 'SALAS'
        },
        {
            route: '/secretaria/gerencia/funcionario',
            name: 'FUNCIONÁRIOS',
        },
    ]
    return (
        <>
        <HeaderBar title={"Gerenciar usuários"}/>
        <div class='gerencia-usuarios'>            
            <div>
                <Link
                to={usuariosGerenciaveis[1].route}
                >
                <div class='gerencia-alunos-funcionarios'>
                     <SupervisedUserCircleIcon style={{ fontSize: 300, color: '#3285fa' }}/>
                    <span class='gerencia-text'>
                        {usuariosGerenciaveis[1].name}
                    </span>
                </div>
                </Link>
            </div>
            <div className={'container-alunos-funcionarios'}>
                <Link
                to={usuariosGerenciaveis[0].route}
                >
                <div class='gerencia-alunos-funcionarios'>
                    <AccountCircleIcon style={{ fontSize: 300, color: '#3285fa' }} />
                    <span class='gerencia-text'>
                        {usuariosGerenciaveis[0].name}
                    </span>
                </div>
                </Link>

                <Link
                to={usuariosGerenciaveis[2].route}
                >
                <div class='gerencia-alunos-funcionarios'>
                    <AccountCircleIcon style={{ fontSize: 300, color: '#3285fa' }} />
                    <span class='gerencia-text'>
                        {usuariosGerenciaveis[2].name}
                    </span>
                </div>
                </Link>
            </div>
        </div>
        </>
        
    );
};

export default Gerenciar;