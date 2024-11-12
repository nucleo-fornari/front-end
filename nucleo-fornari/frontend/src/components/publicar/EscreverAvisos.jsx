import { useState } from 'react';

function EscreverAvisos(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className="w-full flex items-center flex-col px-20 pt-10">
            <button
                className="bg-blue-main p-0 mb-3 rounded-lg w-4/5 flex flex-col gap-2"
                onClick={toggleMenu}
            >
                <p className="text-1xl py-5 pl-10">Escreva um aviso para a turma</p>
            </button>

            <div
                className={`w-4/5 overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
           >
                <div className="bg-blue-pastel border rounded-lg p-5 shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Para
                        </label>
                        <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>G1A</option>
                            <option>G1B</option>
                            <option>G1C</option>


                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Escreva um aviso para sua turma
                        </label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                            rows="4"
                            placeholder="Escreva seu aviso aqui..."
                        />
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
    );
}

export default EscreverAvisos;
