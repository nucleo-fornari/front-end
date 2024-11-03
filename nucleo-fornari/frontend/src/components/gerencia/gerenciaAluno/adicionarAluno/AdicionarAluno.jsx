import React, { useState } from 'react';
import './adicionarAluno.css'
import { Link, useLocation } from 'react-router-dom';

const Publication = () => {

    const location = useLocation();

    const [partCadastro, setPartCadastro] = useState(0);

    const etapasCadastro = [
        {
            name: '/secretaria/cadastro/aluno',
            parte1: 'Aluno',
            parte2: 'Adicionais',
            parte3: 'Responsável',
            parte4: 'Endereços',
            parte5: 'Finalizar',
        },
        {
            name: '/secretaria/cadastro/funcionario',
        }
    ];

    const incrementPartCadastro = () => {
        setPartCadastro(partCadastro + 1);
      };
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
            <header>
                <h1>Cadastro</h1>
                <div className="steps">
                    {['Aluno', 'Adicionais', 'Responsável', 'Endereços', 'Finalizar'].map((label, index) => (
                    <div key={index} className="step">
                        <div className={`circle ${index === partCadastro ? 'active' : ''}`}>{index + 1}</div>
                        <span>{label}</span>
                        {index < 4 && <hr />}
                    </div>
                    ))}
                </div>
            </header>
                <form>
                    <label>Nome completo</label>
                    <input type="text" />
                    <label>RA</label>
                    <input type="text" />
                    <label>Data de nascimento</label>
                    <input type="date" />
                </form>
            </div>            
            <div class='containner-btn-interativo'>
                <span class='btn-interativo' onClick={incrementPartCadastro}>
                    Proximo 
                </span>
            </div>
        </div>
    );
};

export default Publication;