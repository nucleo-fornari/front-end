import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ModalConfirm = ({ open, onClose, onConfirm, title, description }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Typography id="modal-description" variant="body1" gutterBottom>
                    {description}
                </Typography>
                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button variant="outlined" color="primary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="error" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalConfirm;