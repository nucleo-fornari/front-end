import React, {useEffect, useState} from 'react';
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
  IconButton,
  createTheme,
  styled,
  ThemeProvider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { WidthWide } from '@mui/icons-material';
import { red } from '@mui/material/colors';

const ModalChamado = ({ setData, open, handleClose }) => {
  const [category, setCategory] = useState('');
  const [tipos, setTipos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAtipic, setIsAtipic] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };


  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (descriptionError) {
      setDescriptionError('');
  }
  };

  const handleAtipicChange = (event) => {
    setIsAtipic(event.target.value);
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      setDescriptionError('O campo "Descrição" deve ser preenchido.');
      return;
    }
    await api.post(`/chamados?idUsuario=${sessionStorage.ID}`, {
      descricao: description,
      criancaAtipica: isAtipic,
      tipo: {
        id: category
      }
    }).then((res) => {
      if (res.status === 201) {
        toast.success('Chamado criado com sucesso!');
        setData((dataPrev) => [...dataPrev, res.data])
      }
    }).catch((error) => {
      if (error.response && error.response.data.text) {
            setDescriptionError(error.response.data.text);
        } else {
            toast.error('Erro inesperado!');
        }
    })
    handleClose();
  };

  useEffect(() => {
    api.get('/tipos-chamado')
        .then((res) => {
          setTipos(res.data);
        }).catch((error) => console.log(error))
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 1,
        tablet: 768,
        laptop: 1024,
      },
    },
  });

  const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.up('mobile')]: {
      width:700
    
    },
    [theme.breakpoints.up('tablet')]: {
      width:500
    },
    [theme.breakpoints.up('laptop')]: {
      width:400
    },
  }));

  

  return (
    <Modal open={open} onClose={handleClose}>
      <ThemeProvider theme={theme}>
      <Root>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            mobile: '700px', // Largura dinâmica para telas pequenas
            tablet: '500px', // Largura fixa para tablet
            laptop: '400px', // Largura fixa para laptop
          },
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
        <Typography variant="h6" component="h2">
          Categoria:
        </Typography>

        <FormControl component="fieldset" fullWidth margin="normal">
          <RadioGroup row value={category} onChange={handleCategoryChange}>
            {tipos.length > 0 ? tipos.map(((x) => (
                <FormControlLabel value={x.id} control={<Radio />} label={x.tipo} />
            ))) : null}
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
          error={!!descriptionError}
          helperText={descriptionError}
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
      </Root>
      </ThemeProvider>
    </Modal>
  );
};

export default ModalChamado;
