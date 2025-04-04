import React, { useState, useEffect } from "react";
import { Button, Modal, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import api from "../../services/api";
import dayjs from "dayjs";
import HeaderBar from "../header-bar/headerBar";
import { toast } from "react-toastify";

function PedidosReuniaoPorSala(props) {
    const [agendamentos, setAgendamentos] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState(null);
    const [newData, setNewData] = useState("");


    useEffect(() => {
        // Buscar os agendamentos pela sala
        api.get(`/agendamento?idSala=${sessionStorage.ID_SALA}`)
            .then(response => {
                if (response.data) {
                    setAgendamentos(response.data);
                }
            })
            .catch(error => {
                console.error("Erro ao buscar agendamentos:", error);
            });
    }, []);

    const handleOpen = (agendamento) => {
        setSelectedAgendamento(agendamento);
        setNewData(dayjs(agendamento.data).format('YYYY-MM-DDTHH:mm')); // Formatando a data para o input
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAgendamento(null);
        setNewData("");
    };

    const handleChangeData = (event) => {
        setNewData(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedAgendamento) return;

        // Certificando-se de que a data está no formato correto
        const formattedDate = dayjs(newData).format('YYYY-MM-DDTHH:mm:ss');

        const agendamentoUpdate = {
            responsavelId: sessionStorage.ID,
            data: formattedDate,
            motivo: selectedAgendamento.motivo,
            descricao: selectedAgendamento.descricao,
            aceito: selectedAgendamento.aceito
        };

        try {
            const response = await api.put(`/agendamento/${selectedAgendamento.id}/aceitar-ou-modificar`, agendamentoUpdate);
            console.log("Agendamento modificado:", response.data);
            setAgendamentos((prev) =>
                prev.map((agendamento) =>
                    agendamento.id === selectedAgendamento.id ? response.data : agendamento
                )
            );
            handleClose();
        } catch (error) {
            toast.error(error.response?.data?.message || error.text || "Erro ao modificar o agendamento:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <HeaderBar title={"Reunião"} />
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, maxWidth: "90%", marginTop: 2, marginLeft: "auto", marginRight: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#1a73e8" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Motivo</TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Data</TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Aceito</TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Descrição</TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agendamentos.map((agendamento) => (
                            <TableRow key={agendamento.id} hover sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                                <TableCell>{agendamento.motivo}</TableCell>
                                <TableCell align="center">{dayjs(agendamento.data).format('DD/MM/YYYY HH:mm')}</TableCell>
                                <TableCell align="center">{agendamento.aceito ? "Sim" : "Não"}</TableCell>
                                <TableCell align="center">{agendamento.descricao}</TableCell>
                                <TableCell align="center">
                                    {agendamento.aceito ?
                                        <Button>
                                            Aceito
                                        </Button> :
                                        <Button
                                            variant="contained"
                                            color={"primary"}
                                            onClick={() => handleOpen(agendamento)}
                                            sx={{ width: "120px", fontWeight: "bold" }}
                                        >
                                            Aceitar
                                        </Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ width: 400, padding: 3, backgroundColor: "white", margin: "auto", marginTop: "10%", borderRadius: 2, boxShadow: 5 }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
                        Alterar horário da reunião
                    </Typography>
                    <TextField
                        label="Novo horário"
                        type="datetime-local"
                        fullWidth
                        value={newData}
                        onChange={handleChangeData}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ width: "100%", fontWeight: "bold", padding: "12px 0" }}>
                        Confirmar
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default PedidosReuniaoPorSala;
