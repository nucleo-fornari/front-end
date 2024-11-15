import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';

const Avisos = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const res = await api.get('/eventos/publicacoes');
                setData(res.data);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }
        };

        fetchEventos();
    }, []);

    return (
        <section className="w-full flex items-center flex-col px-20 py-4 overflow-y-scroll h-full">
            {data.map((aviso, index) => (
                <div key={index} className="bg-white-ice shadow-2xl p-10 mb-3 rounded-lg w-4/5 flex flex-col gap-2">
                    <h1 className="text-4xl font-semibold text-blue-main">{aviso.titulo}</h1>
                    <p className="text-2xl py-5 text-black-light">{aviso.descricao}</p>
                    <h3 className="italic font-semibold text-black-light">Por {aviso.usuarioId},</h3>
                    <p className="italic text-black-light">
                    {format(parseISO(aviso.data), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                        </p>
                </div>
            ))}
        </section>
    );
};

export default Avisos;
