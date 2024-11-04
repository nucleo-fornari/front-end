import React, { useEffect, useState } from 'react';
import "./chamadosSecretaria.css";
import { FaCheck } from 'react-icons/fa';
import api from "../../services/api";
import CloseIcon from '@mui/icons-material/Close';

// const HelpRequestTable = ({ data }) => {
//   return (
//     <div className="bg-[#edebeb] p-4 rounded-lg overflow-x-auto">
//       <table className="w-full table-auto bg-[#edebeb]">
//         <thead>
//           <tr className="text-left">
//             <th className="p-3 text-gray-600">Prioridade</th>
//             <th className="p-3 text-gray-600">Sala</th>
//             <th className="p-3 text-gray-600">Professor</th>
//             <th className="p-3 text-gray-600">Categoria</th>
//             <th className="p-3 text-gray-600">Descrição</th>
//             <th className='p-3 text-gray-600'>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index} className="bg-[#edebeb]">
//               <td className="p-3">
//                 <div className="flex justify-center items-center">
//                   <span
//                     className={`w-2.5 h-2.5 rounded-full ${
//                       item.prioridade === 'alta' ? 'bg-red-500' : 'bg-yellow-500'
//                     }`}
//                   ></span>
//                 </div>
//               </td>
//               <td className="p-3">
//                 <div className="bg-white p-2 rounded-md">{item.sala}</div>
//               </td>
//               <td className="p-3">
//                 <div className="bg-white p-2 rounded-md">{item.professor}</div>
//               </td>
//               <td className="p-3">
//                 <div className="bg-white p-2 rounded-md">{item.categoria}</div>
//               </td>
//               <td className="p-3">
//                 <div className="bg-white p-2 rounded-md">
//                   {item.descricao.length > 30
//                     ? item.descricao.slice(0, 30) + '...mais'
//                     : item.descricao}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

const ChamadosSecretaria = () => {

  const [data, setData] = React.useState([]);
  useEffect(() => {
    api.get(`/chamados/abertos`)
      .then(res => {
        setData(res.data);
      })
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div class="containner-chamados">
      <label>Filtar por:</label>
      <select name="" id="">
        <option value="">Prioridade</option>
        <option value="">Sala</option>
        <option value="">Categoria</option>
      </select>
      <table className="w-full table-auto bg-[#edebeb]">
        <thead>
          <tr className="text-left">
            <th className="p-3 text-gray-600">Prioridade</th>
            <th className="p-3 text-gray-600">Sala</th>
            <th className="p-3 text-gray-600">Professor</th>
            <th className="p-3 text-gray-600">Categoria</th>
            <th className="p-3 text-gray-600">Descrição</th>
            <th className='p-3 text-gray-600'>Ações</th>
          </tr>
        </thead>
        {data.map((chamado, index) => (
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
                <button class="btn-concluir-chamado" onClick={openModal}>
                  <FaCheck size={15} color="white" />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
        {isModalOpen && (
          <div class="modal-overlay">
            <div class="modal-content">
              <div className='flex flex-row-reverse'>
                <button onClick={closeModal} className="close-modal-btn">
                  <CloseIcon fontSize="large" />
                </button>
              </div>

              <div className="flex justify-center items-center mr-12 bg-white-gray w-6 h-6">
                <div class='red-dot'></div>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Sala: G1A</div>
              </td>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Professor: Caique de Andrade</div>
              </td>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Categoria: </div>
              </td>
              </div>
              <div>
              <td className="p-3">
                <div className="bg-white p-2 rounded-md">Descrição: </div>
              </td>
              </div>
              <div>
              <td className="p-3 flex flex-row-reverse">
                <button onClick={closeModal} class='btn-interativo'>Concluir</button>
              </td>
              </div>
              
            </div>

          </div>
        )}
      </table>
    </div>
  );
};

export default ChamadosSecretaria;
