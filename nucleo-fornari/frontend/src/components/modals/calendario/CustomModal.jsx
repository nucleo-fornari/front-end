import { Modal, Box, Typography, Button, Paper, List, ListItem, Chip, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AdicionarEvento from './AdicionarEvento';
import InfoEvento from './InfoEvento';

function CustomModal({ open, handleClose, value, events }) {
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

                    {/* Display the event list */}
                    <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
                        <List>
                            {events.map((event, index) => (
                                <ListItem key={index} onClick={() => handleClickInfoEvento(event)} style={{ cursor: 'pointer' }}>
                                    <Chip
                                        label={`${event.time} - ${event.title}`}
                                        color={event.color}
                                        sx={{ mr: 1 }}
                                    />
                                </ListItem>
                            ))}
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
                            {value ? value.format('DD/MM/YYYY') : 'Nenhuma data selecionada'}
                        </Typography>
                    </Box>
                </Box>
            </Modal>
            
            <AdicionarEvento open={openAddEvento} handleClose={handleCloseAddEvento} selectedDate={value} />
            <InfoEvento open={openInfoEvento} handleClose={handleCloseInfoEvento} event={selectedEvent} />
        </>
    );
}

export default CustomModal;
