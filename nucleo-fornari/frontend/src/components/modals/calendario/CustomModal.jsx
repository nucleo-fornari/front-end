import { Modal, Box, Typography, Button, Paper, List, ListItem, Chip, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AdicionarEvento from './AdicionarEvento';
import InfoEvento from './InfoEvento';
import { format } from 'date-fns';

function CustomModal({ open, handleClose, value, events, setEvents, setEvent }) {
    const [openAddEvento, setOpenAddEvento] = useState(false);
    const [openInfoEvento, setOpenInfoEvento] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleClickAddEvento = () => {
        setOpenAddEvento(true);
    };

    const handleCloseAddEvento = () => {
        setOpenAddEvento(false);
    }

    const handleClickInfoEvento = (event) => {
        setSelectedEvent(event);
        setOpenInfoEvento(true);
    };

    const handleCloseInfoEvento = () => {
        setOpenInfoEvento(false);
        setSelectedEvent(null);
    }

    return (
        <>
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
                        width: 350,
                        bgcolor: 'background.paper',
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography id="modal-title" variant="h6" sx={{ fontWeight: 'bold' }}>
                            Eventos
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

                    <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
                        <List>
                            {events.length > 0 ? events.map((event, index) => (
                                <ListItem key={index} onClick={() => handleClickInfoEvento(event)} style={{ cursor: 'pointer' }}>
                                    <Chip
                                        label={`${format(event.data, 'HH:mm')} - ${event.titulo}`}
                                        color="success"
                                        sx={{ mr: 1 }}
                                    />
                                </ListItem>
                            )) :
                                "Sem eventos"
                            }
                        </List>
                    </Paper>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            onClick={handleClickAddEvento}
                            variant="contained"
                            sx={{
                                mt: 2,
                                bgcolor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                },
                            }}
                        >
                            Adicionar
                        </Button>

                        <Typography id="modal-description" sx={{ mt: 2, fontSize: '1.2rem', textAlign: 'center' }}>
                            {value ? `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()}` : 'Nenhuma data selecionada'}
                        </Typography>
                    </Box>
                </Box>
            </Modal>

            <AdicionarEvento setEvent={setEvent} setEvents={setEvents} open={openAddEvento} handleClose={handleCloseAddEvento} selectedDate={value} />
            <InfoEvento open={openInfoEvento} handleClose={handleCloseInfoEvento} event={selectedEvent} />
        </>
    );
}

export default CustomModal;
