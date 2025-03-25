import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AvisosService from "../../../services/AvisosService";
import {toast} from "react-toastify";

export default function ModalAluno({ open, handleClose, aluno }) {
  const [openObservacao, setOpenObservacao] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenObservacao = () => {
    setOpenObservacao(true);
  };

  const handleCloseObservacao = () => {
    setOpenObservacao(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {

      if(!title || !description) {
          toast.error('Preencha todos os campos!');
          return;
      }

    AvisosService.createRecado(
    {
                titulo: title,
                conteudo: description,
                usuarioId: sessionStorage.ID
            },
        aluno.id
    ).then((res) => {
        if (res.status === 201) {
            toast.success('Observação criada com sucesso!');
            handleCloseObservacao();
        }
    }).catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || error.text || 'Erro ao criar observação!');
    });
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <IconButton 
            aria-label="close" 
            onClick={handleClose} 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8 
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography 
            id="modal-title" 
            variant="h6" 
            component="h2" 
            align="center" 
          >
            {aluno?.nome}
          </Typography>

          <Typography 
            variant="subtitle2" 
            align="center" 
            className="text-gray-500"
            sx={{ mb: 2 }}
          >
            RA: {aluno?.ra}
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ mb: 1 }}
          >
            Responsáveis:
          </Typography>

          <Stack spacing={1} sx={{ mb: 3 }}>
            {aluno?.filiacoes?.map((filiacao, index) => (
              <Typography 
                key={index} 
                variant="body2" 
                sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ddd', borderRadius: '4px', padding: '8px' }}
              >
                <span>{filiacao.responsavel.nome}</span>
                <span>{filiacao.responsavel.telefone}</span>
              </Typography>
            ))}
          </Stack>
          {/* implementar observação diária */}
          <Button 
            variant="contained" 
            fullWidth 
            className="my-2 mt-2"
            sx={{ mb: 1.5 }}
            onClick={handleOpenObservacao}
          >
            Observação Diária
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            className="my-2 mt-2"
            onClick={handleClose}
          >
            Fechar
          </Button>
        </Box>
      </Modal>

      {/* Modal para Observação Diária */}
        <Modal open={openObservacao} onClose={handleCloseObservacao} aria-labelledby="observacao-modal-title">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: 280, sm: 400 },
                    bgcolor: 'background.paper',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    p: 4,
                    outline: 'none',
                }}
            >
                {/* Botão de Fechar */}
                <IconButton
                    aria-label="close"
                    onClick={handleCloseObservacao}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'grey.600',
                        '&:hover': { color: 'grey.900', transform: 'scale(1.1)' },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Título */}
                <Typography id="observacao-modal-title" variant="h6" component="h2" align="center" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Observação Diária para {aluno?.nome}
                </Typography>

                {/* Campo de Título */}
                <TextField
                    fullWidth
                    placeholder="Título"
                    onChange={handleTitleChange}
                    sx={{
                        mb: 2,
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        },
                    }}
                />

                {/* Campo de Observação */}
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleDescriptionChange}
                    placeholder="Observação"
                    sx={{
                        mb: 2,
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        },
                    }}
                />

                {/* Botão de Enviar */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        mt: 2,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Enviar
                </Button>
            </Box>
        </Modal>

    </>
  );
}
