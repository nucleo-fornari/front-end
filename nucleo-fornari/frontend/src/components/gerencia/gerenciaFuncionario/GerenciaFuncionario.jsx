import React from 'react';
import './gerenciaFuncionario.css';
import { Link } from 'react-router-dom';

const Publication = () => {
    return (
        <div class='containner-gerencia-funcionarios'>
            <div class='containner-adicionar-funcionario'>
                <Link
                to={'/secretaria/cadastro/funcionario'}
                >                
                    <span class='redireciona-adicionar-funcionario'>
                    
                        + Novo Funcionario
                    
                    </span>
                </Link>
            </div>
            <div class='containner-lista-funcionarios'>
                Tela gerencia funcionarios
            </div>

        </div>
    );
};

export default Publication;