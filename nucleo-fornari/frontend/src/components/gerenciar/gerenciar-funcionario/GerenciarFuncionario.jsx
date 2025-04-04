import React, { useEffect, useState } from 'react';
import './GerenciarFuncionario.css';
import { Link } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FuncionarioService from "../../../services/FuncionariosService";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import ModalConfirm from '../../modals/confirmar-acao/ModalConfirm';
import HeaderBar from '../../header-bar/headerBar';
import ModalEdit from '../../modals/editar-personas/ModalEdit';

const GerenciarFuncionario = () => {

    const [funcionarios, setFuncionarios] = useState([]);
    const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
    const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({})

    const handleEdit = (user) => {
        setUser(user)
        console.log(user)
        setOpen(true)
    }
    const handleClose = () => setOpen(false)

    const handleCloseModal = () => setModalConfirmOpen(false);

    const handleOpenConfirmModal = (id) => {
        setId(id)
        setModalConfirmOpen(true);
    };

    const handleConfirmAction = () => {
        handleDelete();
        setModalConfirmOpen(false);
    };

    const handleSelectChange = (event) => {
        if (!event) {
            setFilteredFuncionarios(funcionarios);
            return;
        }
        setFilteredFuncionarios(funcionarios.filter(funcionario => funcionario.nome.toUpperCase().indexOf(event.toUpperCase()) !== -1));
    }

    const loadFuncionarios = () => {
        FuncionarioService.getFuncionarios().then((res) => {
            setFuncionarios(res.data.filter(func => func.funcao !== 'RESPONSAVEL'));
        }).catch((error) => console.log(error));
    }

    const handleDelete = () => {
        FuncionarioService.deleteFuncionario(id).then((res) => {
            if (res.status === 204) {
                toast.success('Deletado com sucesso!');
                const aux = funcionarios.filter((funcionario) => funcionario.id !== id);
                setFuncionarios(aux);
            }
        }).catch((error) => {
            console.log(error);
            toast.error(error.response?.data?.message || error.text || 'Erro ao deletar!');
        })
    }

    useEffect(() => {
        loadFuncionarios();
    }, []);

    useEffect(() => {
        setFilteredFuncionarios(funcionarios);
    }, [funcionarios]);

    return (
        <div>
            <HeaderBar title={"Gerenciar Funcionários"} />
            <div class='containner-gerencia-funcionarios'>
                <div class='containner-adicionar-funcionario'>
                    <Link
                        to={'/secretaria/cadastro/funcionario'}
                    >
                        <span class='redireciona-adicionar-funcionario'>
                            Novo funcionário
                        </span>
                    </Link>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <TextField
                            label="Buscar por nome:"
                            variant="outlined"
                            onChange={(e) => handleSelectChange(e.target.value)}
                            placeholder=""
                        />
                    </FormControl>
                </div>
                <Box sx={{ p: 5 }}>

                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Funcionario</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Funcão</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!filteredFuncionarios || !Array.isArray(filteredFuncionarios) ? null :
                                    filteredFuncionarios.map((func) => (
                                        <TableRow hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                                            <TableCell align="center">
                                                <Box sx={{ p: 1, borderRadius: 1 }}>{func.nome}</Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ p: 1, borderRadius: 1 }}>{func.funcao}</Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ p: 1, borderRadius: 1 }}>{func.email}</Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <EditIcon onClick={() => handleEdit(func)} style={{ color: 'blue', cursor: 'pointer', marginRight: 8 }} />
                                                <DeleteIcon
                                                    onClick={() => handleOpenConfirmModal(func.id)}
                                                    style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <ModalConfirm
                    open={modalConfirmOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmAction}
                    title={`Deseja apagar o usuário?`}
                    description={`O usuário será apagado, Após confirmar esta ação não poderá ser desfeita.`}
                />
            </div>
            <ModalEdit open={open} handleClose={handleClose} usuario={user} />
        </div>

    );
};

export default GerenciarFuncionario;