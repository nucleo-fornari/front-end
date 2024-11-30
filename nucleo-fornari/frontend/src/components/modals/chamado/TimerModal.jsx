import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, LinearProgress } from "@mui/material";

const TimerModal = ({
    open,
    onPositiveClose,
    onNegativeClose,
    initialTimer = 10,
    confirmationText = "Sim",
    mainText = "Tem certeza que deseja continuar? a ação será confirmada automaticamente em %s segundos.",
    declineText = "Não"
}) => {
    const [timer, setTimer] = useState(initialTimer);

    // Reinicia o timer toda vez que o modal é aberto
    useEffect(() => {
        if (open) {
            setTimer(initialTimer);
        }
    }, [open, initialTimer]);

    // Decrementa o timer enquanto o modal está aberto
    useEffect(() => {
        if (!open) return;

        const timerId = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    onPositiveClose(); // Confirma automaticamente ao atingir 0
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerId); // Limpa o intervalo ao desmontar ou fechar
    }, [open, onPositiveClose]);

    return (
        <Modal open={open} onClose={onNegativeClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    textAlign: "center",
                    width: "90%",
                    maxWidth: "600px",
                }}
            >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Confirme as alterações
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    {mainText.replace("%s", timer)}
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={(timer / initialTimer) * 100}
                    sx={{ height: 10, borderRadius: 5, mb: 3 }}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        mt: 3,
                    }}
                >
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onNegativeClose}
                        sx={{ width: "45%" }}
                    >
                        {declineText}
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={onPositiveClose}
                        sx={{ width: "45%" }}
                    >
                        {confirmationText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default TimerModal;
