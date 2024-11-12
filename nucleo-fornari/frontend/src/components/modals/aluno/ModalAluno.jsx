import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalAluno({ open, handleClose, aluno }) {
  const [openObservacao, setOpenObservacao] = useState(false);

  const handleOpenObservacao = () => {
    setOpenObservacao(true);
  };

  const handleCloseObservacao = () => {
    setOpenObservacao(false);
  };

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
                <span>{filiacao.responsavel.cpf}</span>
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
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: 24,
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
              right: 8 
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography id="observacao-modal-title" variant="h6" component="h2" align="center" sx={{ mb: 2 }}>
            Observação Diária
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Digite a observação"
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            fullWidth 
            className="my-2 mt-2"
            onClick={handleCloseObservacao}
          >
            Enviar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
