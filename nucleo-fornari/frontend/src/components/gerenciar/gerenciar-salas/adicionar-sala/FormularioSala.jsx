import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Paper, Typography, Box, FormControl, InputLabel, Select, MenuItem, capitalize, TextField, Button, FormHelperText } from "@mui/material";
import api from "../../../../services/api";

export default function FormularioSala({ setStep }) {
    const navigate = useNavigate();
    const [partCadastro, setPartCadastro] = useState(0);
    const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        localizacao: "",
        grupo: { id: "", nome: "" },
    });
    const [errors, setErrors] = useState({});
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        api.get("/salas/grupos")
            .then((response) => {
                setGrupos(response.data);
            })
            .catch((error) => {
                if (error.status == 204) {
                    toast.error("Não existe nenhum grupo de sala")
                }
                toast.error("Erro ao procurar grupos de sala")
            });
    }, []);

    const validateStep = (step) => {
        const currentErrors = {};
        const stepFields = [
            ["grupo"],
            ["nome", "localizacao"],
            ["grupo", "nome", "localizacao"]
        ];

        stepFields[step].forEach((field) => {
            if (formData[field] === "" || (typeof formData[field] === "object" && formData[field].nome === "")) {
                currentErrors[field] = "Campo em erro";
            }
        });

        setErrors((prev) => ({ ...prev, ...currentErrors }));
        return Object.keys(currentErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "grupo") {
            setFormData((prev) => ({
                ...prev,
                grupo: value,
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleInputChangeNewGroup = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            grupo: { ...prev.grupo, nome: value },
        }));
    };

    const incrementPartCadastro = () => {
        if (!validateStep(partCadastro)) {
            return;
        }
        if (partCadastro === 2) {
            handleSubmit();
        }
        setPartCadastro(partCadastro + 1);
        setStep(partCadastro + 1);
    };

    const decreasePartCadastro = () => {
        if (partCadastro === 0) {
            setPartCadastro(partCadastro);
            return;
        }
        setPartCadastro(partCadastro - 1);
        setStep(partCadastro - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep(partCadastro)) {
            setPartCadastro(partCadastro);
            return;
        }     
        if (!formData.grupo.id) {
            api.post(`/salas/grupos/${formData.grupo.nome}`)
                .then((response) => {
                    createSala(response.data.id);
                })
                .catch((error) => {
                    console.log(error)
                    toast.error("Erro ao cadastrar o grupo de sala")
                });
        } else {
            createSala(formData.grupo.id);
        }
        
    };

    const createSala = (idGrupo) => {
        api.post("/salas", {
            nome: formData.nome,
            localizacao: formData.localizacao,
            grupoId: idGrupo,
        })
            .then((response) => {
                if (response.status === 201) {
                    toast.success("Sala cadastrada com sucesso!");
                    setFormData({
                        nome: "",
                        localizacao: "",
                        grupo: { id: "", nome: "" },
                    });
                    navigate("/secretaria/gerencia/salas");
                }
            })
            .catch((error) => {
                console.log(error)
                toast.error("Erro ao cadastrar o grupo de sala");
            });
    }

    const handleNewGroupToggle = () => {
        setIsCreatingNewGroup(!isCreatingNewGroup);
        setFormData({ ...formData, grupo: "" });
    };

    return (
        <>
            <section className="flex flex-row align-center h-1/2 w-full justify-center">
                <form className="flex flex-col w-1/2 h-full">
                    {partCadastro === 0 && (
                        <>
                            <Box sx={{ width: "40%", paddingTop: "6.5px" }}>
                                {!isCreatingNewGroup && (
                                    <FormControl fullWidth error={!!errors.grupo} sx={{ marginBottom: 2 }}>
                                        <InputLabel id="grupo-label">Escolher grupo</InputLabel>
                                        <Select
                                            label="Escolher grupo"
                                            name="grupo"
                                            value={formData.grupo}
                                            onChange={handleInputChange}
                                        >
                                            {!Array.isArray(grupos) ? null : grupos.map((grupo) => (
                                                <MenuItem key={grupo.id} value={grupo}>
                                                    {grupo.nome}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{errors.grupo}</FormHelperText>
                                    </FormControl>
                                )}

                                <Box sx={{ marginBottom: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleNewGroupToggle}
                                        fullWidth
                                    >
                                        {isCreatingNewGroup ? "Cancelar Criação de Grupo" : "Criar Novo Grupo"}
                                    </Button>
                                </Box>

                                {isCreatingNewGroup && (
                                    <Box sx={{ marginTop: 2 }}>
                                        <TextField
                                            label="Nome do Novo Grupo"
                                            name="grupo"
                                            value={formData.grupo.nome}
                                            onChange={handleInputChangeNewGroup}
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                            required
                                        />
                                    </Box>
                                )}
                            </Box>
                        </>
                    )}
                    {partCadastro === 1 && (
                        <>
                            <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="Nome da Sala"
                                name="nome"
                                variant="outlined"
                                type="text"
                                fullWidth={true}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                value={formData.nome}
                                error={!!errors.nome}
                                helperText={errors.nome}
                            />
                            <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="Localização"
                                name="localizacao"
                                variant="outlined"
                                type="text"
                                fullWidth={true}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                value={formData.localizacao}
                                error={!!errors.localizacao}
                                helperText={errors.localizacao}
                            />
                        </>
                    )}
                    {partCadastro === 2 && (
                        <>
                            <Box sx={{ marginBottom: 2 }}>
                                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                                    <Typography variant="h6" component="p" gutterBottom>
                                        <strong>Nome da Sala:</strong> {formData.nome}
                                    </Typography>
                                    <Typography variant="h6" component="p" gutterBottom>
                                        <strong>Localização:</strong> {formData.localizacao}
                                    </Typography>
                                    <Typography variant="h6" component="p" gutterBottom>
                                        <strong>Grupo:</strong> {formData.grupo.nome}
                                    </Typography>
                                </Paper>
                            </Box>
                        </>
                    )}
                </form>
            </section>

            <section className="flex w-1/2 justify-evenly">
                <Button
                    variant="contained"
                    size="medium"
                    fullWidth={false}
                    onClick={decreasePartCadastro}
                    style={{
                        visibility: partCadastro === 0 ? "hidden" : "visible",
                        textTransform: capitalize,
                    }}
                >
                    Anterior
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    fullWidth={false}
                    onClick={incrementPartCadastro}
                >
                    {partCadastro === 2 ? "Confirmar" : partCadastro === 1 ? "Finalizar" : "Próximo"}
                </Button>
            </section>
        </>
    );
}
