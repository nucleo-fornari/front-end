import { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import {
    Paper,
    Modal,
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    CircularProgress
} from "@mui/material";

export default function ModalAtrelar({ setDataState, role, setOpenModal, openModal, idSala }) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    // Carrega os dados ao abrir o modal
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(
                    role === "PROFESSOR"
                        ? "/usuarios/professores"
                        : "/alunos/sem-sala"
                );
                setData(response.data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [role]);

    // Fecha o modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleConfirm = async () => {
        if (selected) {
            try {
                const endpoint = role === "PROFESSOR" 
                    ? `/usuarios/professor/${selected.id}/sala/${idSala}` 
                    : `/alunos/${selected.id}/sala/${idSala}`;
    
                // Atualizando no backend
                await api.patch(endpoint);
    
                // Atualizar o estado local da sala
                setDataState((prevState) => {
                    if (role === "PROFESSOR") {
                        return {
                            ...prevState,
                            professores: [...prevState.professores, selected], // Adiciona ao array de professores
                        };
                    } else if (role === "ALUNO") {
                        return {
                            ...prevState,
                            alunos: [...prevState.alunos, selected], // Adiciona ao array de alunos
                        };
                    }
                    return prevState;
                });
    
                // Remover o item da lista disponível
                setData((prevData) => prevData.filter((item) => item.id !== selected.id));

                // Fechar o modal
                setOpenModal(false);
    
                // Notificação de sucesso
                toast.success(`O ${role.toLowerCase()} foi atrelado à sala com sucesso!`);
            } catch (error) {
                console.error("Erro ao atrelar:", error);
                toast.error(`Erro ao atrelar o ${role.toLowerCase()}. Tente novamente.`);
            }
        } else {
            toast.error("Selecione um item antes de confirmar.");
        }
    };

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2" mb={2}>
                    Atrelar {role === "PROFESSOR" ? "Professor" : "Aluno"}
                </Typography>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                ) : data.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        Nenhum {role.toLowerCase()} disponível para atrelar.
                    </Typography>
                ) : (
                    <Paper elevation={1} sx={{ mt: 3, p: 2 }}>
                    <List>
                        {data.map((item) => (
                            <ListItem
                                key={item.id}
                                disablePadding
                                onClick={() => setSelected(item)}
                            >
                                <ListItemButton
                                    selected={selected === item}
                                    sx={{
                                        "&.Mui-selected": {
                                            bgcolor: "primary.main",
                                            color: "white",
                                            "&:hover": { bgcolor: "primary.dark" },
                                        },
                                    }}
                                >
                                    <ListItemText primary={item.nome} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    </Paper>
                    )}

                <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={handleCloseModal}>
                        voltar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}