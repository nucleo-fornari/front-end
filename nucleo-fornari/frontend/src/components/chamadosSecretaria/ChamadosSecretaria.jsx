import React, {useEffect} from 'react';
import "./chamadosSecretaria.css";
import { FaCheck } from 'react-icons/fa';
import api from "../../services/api";

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
  const [selectValue, setSelectValue] = React.useState(0);
  const [ordenated, setOrdenated] = React.useState(false);

    useEffect(() => {
        if (!ordenated) {
            setTimeout(() => callOrdenator(0), 100)
        }
    }, [data])

    useEffect(() => {
        callOrdenator(parseInt(selectValue));
    }, [selectValue]);

    useEffect(() => {
        api.get(`/chamados/abertos`)
            .then(res => {
                setData(res.data);
            }).catch(error => console.log(error));
    }, []);

  const handleSelectChange = (event) => {
      setSelectValue(event.target.value)
  }

  const callOrdenator = (type) => {
      if (data.length < 1) {
          return;
      }
      let v;
    if (type === 0) {
         v = data.map((x) => ({
             ...x,
             comparatorValue: x.prioridade
         }));

     } else if (type === 1) {
         v = data.map((x) => ({
             ...x,
             comparatorValue: x.categoria
         }));
     } else if (type === 2) {
        v = data.map((x) => ({
            ...x,
            comparatorValue: x.descricao
        }));
    }

      quickSort(v, 0, v.length - 1);
      setData(type !== 0 ? v.reverse() : v);
      setOrdenated(true);
  }

  const isBigger = (v1, v2) => {
      if (typeof v1 == 'string') return v1.localeCompare(v2) > 0;
      if (typeof v2 == "number") return v1 > v2;
  }

  const isSmaller = (v1, v2) => {
      if (typeof v1 == 'string') return v1.localeCompare(v2) < 0;
      if (typeof v2 == "number") return v1 < v2;
  }

  const quickSort = (v, indInicio, indFim) => {
      let j = indFim;
      let i = indInicio;
      let pivo = v[Math.floor((indInicio + indFim) / 2)].comparatorValue

      while(i <= j) {
          while (i < indFim && isBigger(v[i].comparatorValue, pivo)) {
              i = i + 1;
          }

          while (j > indInicio && isSmaller(v[j].comparatorValue, pivo)) {
              j = j - 1;
          }

          if (i <= j) {
              const aux = v[i];
              v[i] = v[j];
              v[j] = aux;
              i = i + 1;
              j = j - 1;
          }
      }
      if (indInicio < j) quickSort(v, indInicio, j);
      if (i < indFim) quickSort(v, i, indFim);
  }

  const compareString = (str1, str2) => {
      return str1.localeCompare(str2) < 0;
  }

  const compareNumber = (n1, n2) => {
      return n1 < n2;
  }

    return (
      <div class="containner-chamados">
        <label>Ordenar por:</label>
        <select onChange={handleSelectChange}>
          <option value="0">Prioridade</option>
          <option value="1">Categoria em ordem alfabetica</option>
          <option value="2">Descrição em ordem alfabetica</option>
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
          {data.length > 1 ? data.map((chamado) => (
              <tbody>
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
          )) : null}
        </table>
      </div>
    );
  };

export default ChamadosSecretaria;
