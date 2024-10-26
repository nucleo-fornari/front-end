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
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

const ModalRecadoGeral = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState(dayjs());

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleSubmit = () => {
    if (!title || !message || !date) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    console.log({ title, message, date });
    setTitle('');
    setMessage('');
    setDate(dayjs()); // Resetando para o dia atual
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
          position: 'relative',
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
        
        <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            value={date}
            onChange={handleDateChange}
            minDate={dayjs()}
            renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
          />
        </LocalizationProvider>

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
