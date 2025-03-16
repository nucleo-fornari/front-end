import {
    Box,
    Button,
    IconButton,
    Modal,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import { Cancel as CloseIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AvaliacaoService from "../../../services/AvaliacaoService";
import {toast} from "react-toastify";

const Dimensoes = ({
                       open,
                       onClose,
                       userId,
                       tipoDimensao,
                       output,
                   }) => {
    const [data, setData] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');
    const [newDimensao, setNewDimensao] = useState({ tituloPreset: '', textoDimensao: '' });
    const [isAddingDimensao, setIsAddingDimensao] = useState(false);

    useEffect(() => {
        AvaliacaoService.getDimensoesCadastradas(userId, tipoDimensao).then((res) => {
            setData(res.data ? res.data : []);
        }).catch((error) => console.log(error))
    }, [tipoDimensao]);

    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        const descricao = data.find((item) => item.textoDimensao === selectedValue)?.textoDimensao;
        setSelectedDescription(descricao || '');
    };

    const handleConfirm = () => {
        output(selectedOption);
        handleClose();
    };

    const handleDelete = (id) => {
        AvaliacaoService.deleteDimensao(id).then(res => {
            toast.success("Deletado com sucesso!");
            setData(data.filter(item => item.id !== id));
        }).catch(error => {
            toast.error("Erro ao deletar");
            console.log(error);
        })
    };

    const handleClose = () => {
        setNewDimensao({ tituloPreset: '', textoDimensao: '' });
        setSelectedDescription('');
        setData([]);
        onClose();
    }

    const handleAddDimensao = () => {
        if (newDimensao.tituloPreset && newDimensao.textoDimensao) {
            const body = {...newDimensao, userId: parseInt(userId), tipoDimensao: tipoDimensao};
            AvaliacaoService.createDimensao(body).then((res) => {
                const newData = [...data, { ...res.data }];
                setData(newData);
                setNewDimensao({ tituloPreset: '', descricao: '' });
                setIsAddingDimensao(false);
            }).catch(error => {
                toast.error("Error ao criar dimensão");
            })
        }
    };

    return (
        <>
            <Modal open={isAddingDimensao} onClose={() => setIsAddingDimensao(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: '90%',
                        maxWidth: '500px',
                    }}
                >
                    <IconButton
                        onClick={() => setIsAddingDimensao(false)}
                        color="white"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        Adicionar Nova Dimensão
                    </Typography>

                    <TextField
                        label="Título da Dimensão"
                        variant="outlined"
                        fullWidth
                        value={newDimensao.tituloPreset}
                        onChange={(e) => setNewDimensao({ ...newDimensao, tituloPreset: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Descrição"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={newDimensao.textoDimensao}
                        onChange={(e) => setNewDimensao({ ...newDimensao, textoDimensao: e.target.value })}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddDimensao}
                        sx={{ mr: 1 }}
                    >
                        Adicionar
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setIsAddingDimensao(false)}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Modal>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                        width: '90%',
                        maxWidth: '800px',
                        height: '90vh',
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        color="white"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box sx={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        marginBottom: 2,
                    }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Selecionar</TableCell>
                                        <TableCell>Dimensão</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(data) &&
                                        data.map((x) => (
                                            <TableRow key={x.textoDimensao}>
                                                <TableCell>
                                                    <Radio
                                                        value={x.textoDimensao}
                                                        checked={selectedOption === x.textoDimensao}
                                                        onChange={handleRadioChange}
                                                    />
                                                </TableCell>
                                                <TableCell>{x.tituloPreset}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => handleDelete(x.id)}
                                                        sx={{ color: 'red' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: 2,
                        padding: 2,
                        marginTop: 2,
                        display: 'inline-block',
                        width: '100%',
                        textAlign: 'center',
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                            Opção selecionada:
                        </Typography>
                    </Box>

                    <Box sx={{
                        marginTop: 2,
                        padding: 2,
                        borderRadius: 2,
                        backgroundColor: '#f9f9f9',
                        maxHeight: 150,
                        overflowY: 'auto',
                        textAlign: 'left',
                        wordBreak: 'break-word',
                    }}>
                        <Typography sx={{ fontSize: '1rem', color: '#333' }}>
                            {selectedDescription || 'Selecione uma dimensão para ver a descrição.'}
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mt: 2, marginRight: "15px" }}
                        onClick={() => setIsAddingDimensao(true)} // Abre o novo modal
                        startIcon={<AddIcon />}
                    >
                        Adicionar nova dimensão
                    </Button>

                    <Button onClick={handleConfirm} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Confirmar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Dimensoes;
