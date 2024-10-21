import React from 'react';
import './adicionarAluno.css'
import { Link } from 'react-router-dom';

const Publication = () => {
    return (
        <div class='containner-cadastro-aluno'>
            <div class='containner-btn-interativo'>
                <Link
                to={'/secretaria/gerencia/aluno'}
                >
                    <span class='btn-interativo'>
                        Cancelar
                    </span>
                </Link>                
            </div>
            <div class='form-cadastro-aluno'>
                <h1>Pagina Adicionar aluno</h1>
            </div>            
            <div class='containner-btn-interativo'>
                <span class='btn-interativo'>
                    Proximo 
                </span>
            </div>
        </div>
    );
};

export default Publication;