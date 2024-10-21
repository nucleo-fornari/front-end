import React from 'react';
import './gerenciaAluno.css';
import { Link } from 'react-router-dom';

const Publication = () => {
    return (

        <div class='containner-gerencia-alunos'>
            <div class='containner-adicionar-aluno'>
                <Link
                to={'/secretaria/cadastro/aluno'}
                >                
                    <span class='redireciona-adicionar-aluno'>
                    
                        + Novo Aluno
                    
                    </span>
                </Link>
            </div>
            <div class='containner-lista-alunos'>
                Tela gerencia alunos
            </div>

        </div>
    );
};

export default Publication;