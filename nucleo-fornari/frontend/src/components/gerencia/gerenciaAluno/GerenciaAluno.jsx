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
            <label>Filtar por:</label>
        <select name="" id="">
          <option value="">Prioridade</option>
          <option value="">Sala</option>
          <option value="">Categoria</option>
        </select>
        <table className="w-full table-auto bg-[#edebeb]">
          <thead>
            <tr className="text-left">
              <th className="p-3 text-gray-600">Sala</th>
              <th className="p-3 text-gray-600">Aluno</th>
              <th className="p-3 text-gray-600">RA</th>
              <th className="p-3 text-gray-600">Responsavel</th>
              <th className='p-3 text-gray-600'>Ações</th>
            </tr>
          </thead>
          {/* {data.map((chamado, index) => (
              <tbody key={index}>
              <tr className="bg-[#edebeb]">
                <td className="p-3">
                  <div className="flex justify-center items-center mr-12">
                    <div class={chamado.prioridade >= 3 ? 'red-dot' : chamado.prioridade > 1 ? 'yellow-dot' : 'green-dot'}></div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">G1A</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">{chamado.responsavel.nome}</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">{chamado.tipo.tipo}</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">{chamado.descricao}</div>
                </td>
                <td className="p-3">
                  <div class="btn-concluir-chamado">
                    <FaCheck size={15} color="white" />
                  </div>
                </td>
              </tr>
              </tbody>
          ))} */}
        </table>
            </div>

        </div>
    );
};

export default Publication;