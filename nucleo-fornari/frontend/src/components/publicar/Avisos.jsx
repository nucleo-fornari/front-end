import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Delete } from '@mui/icons-material';
import AvisosService from "../../services/AvisosService";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

function Avisos({setData, data }) {
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setCurrentData(data);
        }
    }, [data]);

    const handleDelete = (id, deleteHandler) => {
        deleteHandler(id)
            .then((res) => {
                if (res.status === 204) {
                    toast.success('Deletado com sucesso!');
                    const aux = currentData.filter((aviso) => aviso.id !== id);
                    setCurrentData(aux);
                    setData(aux);
                } else {
                    toast.error('Erro ao deletar!');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Erro ao deletar!');
            });
    };

    return (
        <section className="w-full flex items-center flex-col px-20 py-4 overflow-y-scroll h-77vh">
            {currentData.length > 0 ? (
                currentData.map((aviso) => (
                    <div
                        key={aviso.id}
                        className="bg-white-ice shadow-2xl p-10 mb-3 rounded-lg w-4/5 flex flex-col gap-2 relative"
                    >
                        {
                            !aviso.deletable ?
                                null :
                                <button
                                    onClick={() => handleDelete(aviso.id, aviso.deleteHandler)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                >
                                    <Delete fontSize="large"/>
                                </button>
                        }
                        <h1 className="text-4xl font-semibold text-blue-main">{aviso.titulo} </h1>
                        <p className="text-2xl py-5 text-black-light">{aviso.descricao}</p>
                        {
                            ! aviso.alunoNome ?
                                null :
                                <h3 className="italic font-semibold text-black-light">
                                    Para: <span className="text-blue-main">{aviso.alunoNome}</span>
                                </h3>
                        }
                        <h3 className="italic font-semibold text-black-light">Por: {aviso.autor}</h3>
                        {
                            !aviso.data ? null :
                                <p className="italic text-black-light">
                                    {format(parseISO(aviso.data), "EEEE, dd 'de' MMMM 'às' HH:mm", {locale: ptBR})}
                                </p>
                        }
                    </div>
                ))
            ) : (
                <p className="text-2xl text-gray-500">Nenhum aviso encontrado.</p>
            )}
        </section>
    );
}

export default Avisos;