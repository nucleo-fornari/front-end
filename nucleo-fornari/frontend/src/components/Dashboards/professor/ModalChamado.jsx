import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalChamado = ({ open, handleClose }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAtipic, setIsAtipic] = useState(false);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };


  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAtipicChange = (event) => {
    setIsAtipic(event.target.value);
  };

  const handleSubmit = () => {
    console.log({ category, description, isAtipic });
    handleClose();
  }; // INTEGRAR COM O BACKENDO

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
        <Typography variant="h6" component="h2">
          Assunto do Chamado:
        </Typography>

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

        <TextField
          label="Assunto"
          multiline
          fullWidth
          rows={1}
          margin="normal"
          value={title}
          onChange={handleTitleChange}
        />
        <Typography variant="h6" component="h2">
          Categoria:
        </Typography>

        <FormControl component="fieldset" fullWidth margin="normal">
          <RadioGroup row value={category} onChange={handleCategoryChange}>
            <FormControlLabel value="Saúde do aluno" control={<Radio />} label="Saúde do aluno" />
            <FormControlLabel value="Necessidades do professor" control={<Radio />} label="Necessidades do professor" />
            <FormControlLabel value="Suporte de TI" control={<Radio />} label="Suporte de TI" />
            <FormControlLabel value="Suporte da gestão" control={<Radio />} label="Suporte da gestão" />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Descrição"
          multiline
          fullWidth
          rows={3}
          margin="normal"
          value={description}
          onChange={handleDescriptionChange}
        />

        <FormControl component="fieldset" fullWidth margin="normal">
          <FormLabel component="legend">Criança atípica ou em investigação?</FormLabel>
          <RadioGroup row value={isAtipic} onChange={handleAtipicChange}>
            <FormControlLabel value={true} control={<Radio />} label="Sim" />
            <FormControlLabel value={false} control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
          Enviar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalChamado;
