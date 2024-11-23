import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function InfoEvento({ open, handleClose, event }) {
    if (!event) return null; // Retorna null se não houver evento selecionado

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 3,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {event.titulo}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Typography sx={{ mt: 2 }}>
                    {event.descricao || 'Sem descrição disponível.'}
                </Typography>
                <Typography sx={{ mt: 1, fontWeight: 'bold' }}>
                    {event.data instanceof Date
                        ? `${event.data.getHours().toString().padStart(2, '0')}:${event.data.getMinutes().toString().padStart(2, '0')}`
                        : 'Erro na Hora do evento'}
                </Typography>
            </Box>
        </Modal>
    );
}

export default InfoEvento;
