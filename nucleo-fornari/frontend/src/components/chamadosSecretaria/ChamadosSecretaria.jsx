import React from 'react';

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
    return (
      <div className="bg-[#edebeb] p-4 rounded-lg overflow-x-auto w-700">
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
          <tbody>
            
              <tr className="bg-[#edebeb]">
                <td className="p-3">
                  <div className="flex justify-center items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full bg-red-500'`}
                    ></span>
                  </div>
                </td>
  
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">G1A</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">ERIKA</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">necessidade do Professor</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </td>
              </tr>
          </tbody>
          <tbody>
            
              <tr className="bg-[#edebeb]">
                <td className="p-3">
                  <div className="flex justify-center items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full bg-red-500'`}
                    ></span>
                  </div>
                </td>
  
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">G1A</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">ERIKA</div>
                </td>
                <td className="p-3">
                  <div className="bg-white-main p-2 rounded-md">necessidade do Professor</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </td>
              </tr>
          </tbody>
          <tbody>
            
              <tr className="bg-[#edebeb]">
                <td className="p-3">
                  <div className="flex justify-center items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full bg-red-500'`}
                    ></span>
                  </div>
                </td>
  
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">G1A</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">ERIKA</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">necessidade do Professor</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </td>
              </tr>
          </tbody>
          <tbody>
            
              <tr className="bg-[#edebeb]">
                <td className="p-3">
                  <div className="flex justify-center items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full bg-red-500'`}
                    ></span>
                  </div>
                </td>
  
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">G1A</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">ERIKA</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">necessidade do Professor</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </td>
              </tr>
          </tbody>
          <tbody>
            
              <tr className="bg-[#edebeb]">
                <td className="p-3">
                  <div className="flex justify-center items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full bg-red-500'`}
                    ></span>
                  </div>
                </td>
  
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">G1A</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">ERIKA</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">necessidade do Professor</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </td>
              </tr>
          </tbody>
          <tbody>
            
              <tr className="bg-[#edebeb]">
                <td className="p-3">
                  <div className="flex justify-center items-center">
                    <span
                      className={`w-2.5 h-2.5 rounded-full bg-red-500'`}
                    ></span>
                  </div>
                </td>
  
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">G1A</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">ERIKA</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">necessidade do Professor</div>
                </td>
                <td className="p-3">
                  <div className="bg-white p-2 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  };

export default ChamadosSecretaria;
