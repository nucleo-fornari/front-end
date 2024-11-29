import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalAtrelar from '../../../modals/atrelar/ModalAtrelar';

const EditarSala = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    const [dataState, setDataState] = useState(data);
    const [openModal, setOpenModal] = useState(false);
    const [role, setRole] = useState("");

    const handleBack = () => {
        navigate('/secretaria/gerencia/salas');
    }

    const handleAtrelar = (person) => {
        setRole(person);
        setOpenModal(true);
    }

    return (
        <>
        <div className="mt-12 flex flex-col gap-4">
            <div className="flex justify-between items-center h-15 ml-12">
                <button
                    className="flex justify-center items-center bg-blue-500 text-white-ice px-7 py-2 rounded-lg font-semibold"
                    onClick={() => handleBack()}
                >
                    Voltar
                </button>

                <div className="flex space-x-4 mr-12">
                    <button
                        className="flex justify-center items-center bg-blue-500 text-white-ice px-7 py-2 rounded-lg font-semibold"
                        onClick={() => handleAtrelar("PROFESSOR")}
                    >
                        Atrelar Professor
                    </button>
                    <button
                        className="flex justify-center items-center bg-blue-500 text-white-ice px-7 py-2 rounded-lg font-semibold"
                        onClick={() => handleAtrelar("ALUNO")}
                    >
                        Atrelar Aluno
                    </button>
                </div>
            </div>
            <Box sx={{ p: 5 }}>
                {/* Tabela de Professores */}
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1, marginBottom: 4 }}>
                    <h2 style={{ marginLeft: 16 }}>Professores</h2>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>CPF</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Telefone</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>E-mail</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Data de Nascimento</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataState.professores.map((professor) => (
                                <TableRow key={professor.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                                    <TableCell align="center">{professor.nome}</TableCell>
                                    <TableCell align="center">{professor.cpf}</TableCell>
                                    <TableCell align="center">{professor.telefone}</TableCell>
                                    <TableCell align="center">{professor.email}</TableCell>
                                    <TableCell align="center">{professor.dtNasc}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
                    <h2 style={{ marginLeft: 16 }}>Alunos</h2>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>RA</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Laudado</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Data de Nascimento</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Responsável</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataState.alunos.map((aluno) => (
                                <TableRow key={aluno.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                                    <TableCell align="center">{aluno.ra}</TableCell>
                                    <TableCell align="center">{aluno.nome}</TableCell>
                                    <TableCell align="center">{aluno.laudado ? 'Sim' : 'Não'}</TableCell>
                                    <TableCell align="center">{aluno.dtNasc}</TableCell>
                                    <TableCell align="center">{aluno.filiacoes[0]?.responsavel?.nome || 'Não informado'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
        <ModalAtrelar setDataState={setDataState} setOpenModal={setOpenModal} role={role} openModal={openModal} idSala={dataState.id}/>
        </>
    )
}

export default EditarSala;