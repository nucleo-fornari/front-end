import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import api from '../../../services/api';

function AdicionarEvento({ setEvent, setEvents, open, handleClose, selectedDate }) {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('00:00');
    const [description, setDescription] = useState('');

    const handleSave = () => {
        if (!title || !time || !description) {
            toast.error('Todos os campos são obrigatórios!');
            return;
          }

          const [hours, minutes] = time.split(':');
          const date = new Date(selectedDate);
        
          // Ajuste da hora e minutos no mesmo fuso horário
          date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
          // Formatação manual para LocalDateTime (sem o "Z")
          const formattedLocalDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        
      
          api.post('/eventos', {
            titulo: title,
            descricao: description,
            data: formattedLocalDateTime,
            tipo: 'PUBLICACAO',
            usuarioId: parseInt(sessionStorage.getItem('ID'), 10),
            salas: [parseInt(sessionStorage.getItem('ID_SALA'), 10)],
          })
            .then((res) => {
              if (res.status === 201) {
                toast.success('Evento criado com sucesso!');
                setEvent((prevEvents) => [...prevEvents, res.data]);
                setEvents((prevEvents) => [...prevEvents, res.data]);
                handleClose();
              }
            })
            .catch((error) => {
                console.log(error);

                if(error.response.data.status === 409) {
                    toast.error(error.response?.data?.message || error.text || "Você ainda não está em uma sala. Informe a secretaria!")
                } else {

                    toast.error(error.response?.data?.message || error.text || 'Erro inesperado!');
                }
            });
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
                {selectedDate ? `${selectedDate.getDate().toString().padStart(2, '0')} de ${selectedDate.toLocaleString('pt-BR', { month: 'long' })}` : 'Nenhuma data selecionada'}
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