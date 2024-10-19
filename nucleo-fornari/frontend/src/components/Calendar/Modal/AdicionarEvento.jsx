import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AdicionarEvento({ open, handleClose, selectedDate }) {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('00:00');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        const newEvent = {
            title,
            time,
            description,
            date: selectedDate,
        };
        console.log(newEvent);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
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
                    <Typography id="modal-title" variant="h6" sx={{ fontWeight: 'bold' }}>
                        Adicionar evento
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

                {/* Data selecionada */}
                <Typography sx={{ mt: 1, mb: 2, textAlign: 'center', fontSize: '0.9rem', color: 'gray' }}>
                    {selectedDate ? selectedDate.format('DD [de] MMMM') : 'Nenhuma data selecionada'}
                </Typography>

                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Título"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Hora"
                        type="time"
                        variant="outlined"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        onClick={handleSave}
                        variant="outlined"
                        fullWidth
                        sx={{
                            mt: 1,
                            color: '#1976d2',
                            borderColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                                borderColor: '#1976d2',
                            },
                        }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AdicionarEvento;
