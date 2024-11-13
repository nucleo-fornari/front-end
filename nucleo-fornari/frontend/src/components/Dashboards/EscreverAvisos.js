import { useState } from 'react';
import Avisos from './Avisos';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function EscreverAvisos({ avisosData }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [salasSelecionadas, setSalasSelecionadas] = useState([]);
    const todasAsSalas = ['G1A', 'G1B', 'G1C', 'G2A', 'G2B', 'G2C', 'G3A', 'G3B', 'G3C', 'G4A', 'G4B', 'G4C', 'G5A', 'G5B', 'G5C'];

    const salasPorGrupo = {
        G1: ['G1A', 'G1B', 'G1C'],
        G2: ['G2A', 'G2B', 'G2C'],
        G3: ['G3A', 'G3B', 'G3C'],
        G4: ['G4A', 'G4B', 'G4C'],
        G5: ['G5A', 'G5B', 'G5C']   
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSalaChange = (e) => {
        const value = e.target.value;
        if (value === 'all') {
            setSalasSelecionadas(salasSelecionadas.length === todasAsSalas.length ? [] : todasAsSalas);
        } else if (salasPorGrupo[value]) {
            const todasSalasDoGrupo = salasPorGrupo[value];
            const todasSelecionadas = todasSalasDoGrupo.every(sala => salasSelecionadas.includes(sala));
            setSalasSelecionadas((prev) =>
                todasSelecionadas
                    ? prev.filter((sala) => !todasSalasDoGrupo.includes(sala))
                    : [...prev, ...todasSalasDoGrupo.filter(sala => !prev.includes(sala))]
            );
        } else {
            setSalasSelecionadas((prev) =>
                prev.includes(value) ? prev.filter((sala) => sala !== value) : [...prev, value]
            );
        }
    };

    return (
        <div>
            <section className="w-full flex items-center flex-col px-20 pt-10">
                <button
                    className="bg-blue-main p-0 mb-3 rounded-lg w-4/5 flex flex-col gap-2"
                    onClick={toggleMenu}
                >
                    <p className="text-white-ice text-1xl py-5 pl-10 font-bold">Escreva um aviso para a turma</p>
                </button>

                <div
                    className={`w-4/5 overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[650px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="bg-blue-main border rounded-lg p-5 shadow-md">
                        <div className="mb-4">
                            <label className="text-white-ice block text-sm font-bold mb-2">
                                Para
                            </label>
                            <div className="bg-white border border-gray-300 rounded p-4 grid grid-cols-5 gap-4">
                                <div className="col-span-5 flex items-center mb-0">
                                    <input
                                        type="checkbox"
                                        value="all"
                                        checked={salasSelecionadas.length === todasAsSalas.length}
                                        onChange={handleSalaChange}
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700 font-semibold">Selecionar todas</label>
                                </div>
                                {Object.entries(salasPorGrupo).map(([grupo, salas]) => (
                                    <div key={grupo}>
                                        <div className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                value={grupo}
                                                checked={salas.every(sala => salasSelecionadas.includes(sala))}
                                                onChange={handleSalaChange}
                                                className="mr-2"
                                            />
                                            <label className="font-semibold text-gray-700">{grupo}</label>
                                        </div>
                                        {salas.map((sala) => (
                                            <div key={sala} className="flex items-center mb-1">
                                                <input
                                                    type="checkbox"
                                                    value={sala}
                                                    checked={salasSelecionadas.includes(sala)}
                                                    onChange={handleSalaChange}
                                                    className="mr-2"
                                                />
                                                <label className="text-gray-700">{sala}</label>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        
                        </div>

                        <div className="mb-4">
                            <label className="text-white-ice block text-sm font-bold mb-2">
                                Escreva um título para seu aviso.
                            </label>
                            <textarea
                                className="w-full p-2 border-gray-300 rounded-lg resize-none"
                                rows="1"
                                placeholder="Escreva seu título aqui..."
                            />
                            <label className="text-white-ice block text-sm font-bold mb-2 mt-4">
                                Escreva um aviso para sua turma
                            </label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                                rows="2"
                                placeholder="Escreva seu aviso aqui..."
                            />
                            <label className="py-1 text-white-ice block text-sm font-bold mb-2 mt-4">
                                Selecione a data do aviso 
                            </label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Selecione a data do evento" />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        
                        <session className="flex items-center justify-between">
                            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg" onClick={toggleMenu}>
                                Cancelar
                            </button>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                                Postar
                            </button>
                        </session>
                    </div>
                </div>
            </section>
            <Avisos avisosData={avisosData}></Avisos>
        </div>
    );
}

export default EscreverAvisos;
