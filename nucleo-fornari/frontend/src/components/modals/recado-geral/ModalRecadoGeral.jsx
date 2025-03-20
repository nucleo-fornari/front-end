import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/pt-br';
import Api from "../../../services/api";
import { toast } from 'react-toastify';

const ModalRecadoGeral = ({ open, handleClose }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        if (!title || !message) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        Api.post('/eventos', {
            titulo: title,
            descricao: message,
            tipo: "AVISO_GERAL",
            usuarioId: sessionStorage.ID,
            encerrado: false
        }).then(
            (res) => {
                handleResponse(res.status)
            }
        ).catch((error) => {
            console.log(error)
            handleResponse()
        })
    };

    const handleResponse = (status) => {

        if (status == 201) {
            toast.success('Recado criado com sucesso!');
        } else {
            toast.error('Erro ao criar recado!');
        }

        setTitle('');
        setMessage('');
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" textAlign="center" gutterBottom>
                    Criar Recado Geral
                </Typography>
                <TextField
                    label="Título"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextField
                    label="Mensagem"
                    multiline
                    fullWidth
                    rows={4}
                    margin="normal"
                    value={message}
                    onChange={handleMessageChange}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Enviar Recado
                </Button>
            </Box>
        </Modal>
    );
};

export default ModalRecadoGeral;
