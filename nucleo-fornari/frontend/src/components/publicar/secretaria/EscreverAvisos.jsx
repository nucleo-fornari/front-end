import {useEffect, useState} from 'react';
import Avisos from '../Avisos';
import Checkbox from '@mui/material/Checkbox';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {toast} from 'react-toastify';
import AvisosService from "../../../services/AvisosService";
import SalaService from "../../../services/SalaService";
import {DateTimePicker} from "@mui/x-date-pickers";
import Utils from "../../../utils/Utils";
import {useMemo} from "react";
import dayjs from "dayjs";

function EscreverAvisos() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [salasSelecionadas, setSalasSelecionadas] = useState([]);
    const [data, setData] = useState([]); // Estado movido para o nível superior
    const [todasAsSalas, setTodasAsSalas] = useState([]);
    const [isEdition, setIsEdition] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [salasPorGrupo, setSalasPorGrupo] = useState({
        G1: [],
        G2: [],
        G3: [],
        G4: [],
        G5: []
    });
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState();

    useEffect(() => {
        SalaService.getSalas()
            .then((res) => {
                setTodasAsSalas(res.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Erro ao buscar salas!');
            });
    }, []);

    useEffect(() => {
        if (!todasAsSalas) return;

        salasPorGrupo.G1.splice(0, salasPorGrupo.G1.length);
        salasPorGrupo.G2.splice(0, salasPorGrupo.G2.length);
        salasPorGrupo.G3.splice(0, salasPorGrupo.G3.length);
        salasPorGrupo.G4.splice(0, salasPorGrupo.G4.length);
        salasPorGrupo.G5.splice(0, salasPorGrupo.G5.length);

        todasAsSalas.forEach((sala) => {
            salasPorGrupo[sala.grupo.nome]?.push(sala);
        })
    }, [todasAsSalas]);


    useEffect(() => {
        if (data.length === 0) findUserPublications();
    }, []);

    function findUserPublications() {
        AvisosService.getPublicacaoById(sessionStorage.ID)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const toggleMenu = () => {
        setIsEdition(false);
        clearForm();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSalaChange = (e) => {
        const value = e.target.value;

        if (value === 'all') {
            // Alterna entre selecionar todas ou nenhuma sala
            setSalasSelecionadas(
                salasSelecionadas.length === todasAsSalas.length ? [] : todasAsSalas.map((sala) => sala.id)
            );
            return;
        }

        if (salasPorGrupo[value]) {
            // Alterna a seleção de um grupo inteiro
            const salasDoGrupo = salasPorGrupo[value].map((sala) => sala.id);
            const todasSelecionadas = salasDoGrupo.every((salaId) =>
                salasSelecionadas.includes(salaId)
            );

            setSalasSelecionadas((prevSelecionadas) =>
                todasSelecionadas
                    ? prevSelecionadas.filter((salaId) => !salasDoGrupo.includes(salaId))
                    : [...prevSelecionadas, ...salasDoGrupo.filter((salaId) => !prevSelecionadas.includes(salaId))]
            );
            return;
        }

        // Alterna a seleção de uma sala individual
        setSalasSelecionadas((prevSelecionadas) =>
            prevSelecionadas.includes(value)
                ? prevSelecionadas.filter((salaId) => salaId !== value)
                : [...prevSelecionadas, value]
        );
    };



    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDateChange(e) {
        setDate(e);
        console.log(e);
    }

    function handleSubmit() {

        if (!title || !content || !date) {
            toast.error('Preencha todos os campos!');
            return;
        }

        if (salasSelecionadas.length === 0) {
            toast.error('Selecione pelo menos uma sala!');
            return;
        }

        if (isEdition) {
            updatePublication();
        } else {
            createPublication();
        }

        clearForm();
    }

    const clearForm = () => {
        setTitle('');
        setContent('');
        setDate(null);
        setSalasSelecionadas([]);
        setIsMenuOpen(false);
    }

    const createPublication = () => {
        AvisosService.createPublicacao({
            titulo: title,
            descricao: content,
            data: date.format('YYYY-MM-DDTHH:mm:ss'),
            salas: salasSelecionadas,
            usuarioId: parseInt(sessionStorage.ID)
        }).then((res) => {
            if (res.status === 201) {
                toast.success('Criado com sucesso!');
                findUserPublications();
            } else {
                toast.error('Erro ao criar!');
            }
        }).catch((error) => {
            console.error(error);
            toast.error('Erro ao criar!');
        });
    }

    const updatePublication = () => {
        AvisosService.updatePublicacao(currentId, {
            titulo: title,
            descricao: content,
            data: date.format('YYYY-MM-DDTHH:mm:ss'),
            salas: salasSelecionadas,
            usuarioId: parseInt(sessionStorage.ID)
        }).then((res) => {
            if (res.status === 200) {
                toast.success('Editado com sucesso!');
                findUserPublications();
                setIsEdition(false);
            } else {
                toast.error('Erro ao editar!');
            }
        }).catch((error) => {
            console.error(error);
            toast.error('Erro ao editar!');
        });
    }

    const handleEdit = (evento) => {
        setContent(evento.descricao);
        setTitle(evento.titulo);
        setDate(dayjs(evento.data));
        setSalasSelecionadas(evento.salas.map((sala) => sala.id));
        setIsMenuOpen(true);
        setIsEdition(true);
        setCurrentId(evento.id);
    }


    return (
        <div>
            <section className="w-full flex items-center flex-col px-20 pt-10">
                <button
                    className="bg-blue-main p-0 mb-3 rounded-lg w-4/5 flex flex-col gap-2"
                    onClick={toggleMenu}
                >
                    <p className="text-white-ice text-1xl py-5 pl-10 font-bold">Publique um novo evento</p>
                </button>

                <div
                    className={`w-4/5 overflow-hidden shadow-2xl transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="bg-white-main rounded-lg p-5 shadow-2xl ">
                        <div className="mb-4">
                            <label className="text-black-main block text-sm font-bold mb-2">
                                Para
                            </label>
                            <div
                                className="bg-white border-spacing-1 border-gray-300 rounded p-4 grid grid-cols-5 gap-4">
                                {/* Renderizar os grupos e suas salas */}
                                {Object.entries(salasPorGrupo).map(([grupo, salas]) => {
                                    if (salas.length === 0) return null; // Ignorar grupos vazios

                                    const todasSelecionadas = salas.every((sala) =>
                                        salasSelecionadas.includes(sala.id)
                                    );

                                    return (
                                        <div key={grupo}>
                                            {/* Checkbox para o grupo */}
                                            <div className="flex items-center mb-2">
                                                <Checkbox
                                                    value={grupo}
                                                    checked={todasSelecionadas}
                                                    onChange={() => handleSalaChange({target: {value: grupo}})}
                                                    color="default"
                                                    sx={{'& .MuiSvgIcon-root': {fontSize: 25}}}
                                                />
                                                <label className="font-semibold text-gray-700">{grupo}</label>
                                            </div>

                                            {/* Checkboxes individuais para salas */}
                                            {salas.map((sala) => (
                                                <div key={sala.id} className="flex items-center mb-1">
                                                    <Checkbox
                                                        value={sala.id}
                                                        checked={salasSelecionadas.includes(sala.id)}
                                                        onChange={() => handleSalaChange({target: {value: sala.id}})}
                                                        size="small"
                                                        color="default"
                                                    />
                                                    <label className="text-gray-700">{sala.nome}</label>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}

                                {/* Checkbox para selecionar todas as salas */}
                                <div className="col-span-5 flex items-center mb-0">
                                    <Checkbox
                                        value="all"
                                        checked={salasSelecionadas.length === todasAsSalas.length}
                                        onChange={() => handleSalaChange({target: {value: 'all'}})}
                                        color="default"
                                        sx={{'& .MuiSvgIcon-root': {fontSize: 36}}}
                                    />
                                    <label className="text-gray-700">Selecionar todas</label>
                                </div>
                            </div>


                        </div>

                        <div className="mb-4">
                            <label className="text-black-main block text-sm mb-2">
                                Título:
                            </label>
                            <textarea
                                value={title}
                                onChange={handleTitleChange}
                                className="w-full shadow-md p-2 border-gray-300 rounded-lg resize-none"
                                rows="1"
                                placeholder="Escreva seu título aqui..."
                            />
                            <label className="text-black-main block text-sm mb-2 mt-4">
                                Conteúdo:
                            </label>
                            <textarea
                                value={content}
                                onChange={handleContentChange}
                                className="w-full p-2 shadow-md border-gray-300 rounded-lg resize-none"
                                rows="2"
                                placeholder="Escreva seu aviso aqui..."
                            />
                            <label className="py-1 text-black-main block text-sm mb-2 mt-4">
                                Data de ocorrência:
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Selecione a data e hora do evento"
                                    value={date}
                                    onChange={handleDateChange}
                                    ampm={false}
                                />
                            </LocalizationProvider>
                        </div>

                        <section className="flex items-center justify-between">
                            <button
                                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            Cancelar
                            </button>
                            <button
                                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={handleSubmit}>
                                Postar
                            </button>
                        </section>
                    </div>
                </div>
            </section>
            <Avisos
                setData={setData}
                editHandler={handleEdit}
                data={Utils.mapEventoToAviso(data)}></Avisos>
        </div>
    );
}

export default EscreverAvisos;
