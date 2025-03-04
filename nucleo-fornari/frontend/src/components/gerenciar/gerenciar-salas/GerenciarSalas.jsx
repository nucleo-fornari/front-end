import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import ModalConfirm from '../../modals/confirmar-acao/ModalConfirm';
import ArchiveIcon from '@mui/icons-material/Archive';
import HeaderBar from '../../header-bar/headerBar';

const GerenciarSalas = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [salaClicked, setSalaClicked] = useState("");

    const handleOpenModal = (sala) => {
        setSalaClicked(sala)
        setModalOpen(true);
    };

    const handleCloseModal = () => setModalOpen(false);

    const handleConfirmAction = () => {
        handleDelete()
        setModalOpen(false);
    };

    const fetchChamados = () => {
        api.get('/salas')
            .then((res) => setData(res.data))
            .catch((error) => {
                console.error('Erro ao buscar salas:', error);
            });
    };

    useEffect(() => {
        fetchChamados();
    }, []);

    const handleEdit = (data) => {
        navigate('/secretaria/editar/salas', { state: { data } });
    }

    const handleDelete = () => {
            api.delete('/salas/' + parseInt(salaClicked.id))
                .then((res) => {
                    if (res.status === 204) {
                        setData((prevData) => prevData.filter((sala) => sala.id !== salaClicked.id));
                        toast.success('Sala ' + salaClicked.nome + ' deletada com sucesso!');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(error.response?.data?.message || error.text || 'Erro ao deletar a sala: ' + salaClicked.nome);
                });
        }

    const downloadArchive = (className) => {
        const fileUrl = process.env.REACT_APP_API_URL + "/files/download/pessoas-autorizadas-" + className + ".csv";

        const link = document.createElement('a');
        link.href = fileUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div>
        <HeaderBar title={"Gerenciar Salas"}/>
        <div className="mt-12 flex flex-col gap-4">
            <div className="flex justify-start h-15 ml-12">
                <Link
                    to={'/secretaria/cadastro/sala'}
                >
                    <span class='flex justify-center items-center bg-blue-500 text-white-ice px-7 py-2 rounded-lg font-semibold'>
                        Criar sala
                    </span>
                </Link>
            </div>
            <Box sx={{ p: 5 }}>
                {!data.length <= 0 ?
                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sala</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Localização</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Grupo</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quantidade de Alunos</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quantidade de Professores</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.map((sala) => (
                                        <TableRow key={sala.id} hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                                            <TableCell align="center">{sala.nome}</TableCell>
                                            <TableCell align="center">{sala.localizacao}</TableCell>
                                            <TableCell align="center">{sala.grupo?.nome || 'Sem grupo'}</TableCell>
                                            <TableCell align="center">{sala.alunos.length}</TableCell>
                                            <TableCell align="center">{sala.professores.length}</TableCell>
                                            <TableCell align="center">
                                                <EditIcon onClick={() => handleEdit(sala)} style={{ color: 'blue', cursor: 'pointer', marginRight: 8 }} />
                                                <DeleteIcon onClick={() => handleOpenModal(sala)} style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} />
                                                <ArchiveIcon onClick={() => downloadArchive(sala.nome)} style={{ color: 'green', cursor: 'pointer'}}></ArchiveIcon>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <span>Sem salas cadastradas</span>
                }
            </Box>

            <ModalConfirm
                open={modalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAction}
                title="Deseja deletar essa sala?"
                description={`A sala ${salaClicked.nome} será deletada, Após confirmar esta ação não poderá ser desfeita.`}
            />
        </div>
        </div>
        
    );
};

export default GerenciarSalas;
