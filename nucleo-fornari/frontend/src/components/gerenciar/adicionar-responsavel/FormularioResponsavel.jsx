import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Button,
    capitalize,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TableContainer,
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import api from "../../../services/api";

function FormularioResponsavel({ setStep, idAluno }) {
    const navigate = useNavigate();
    const [partCadastro, setPartCadastro] = useState(0);
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        dtNascimento: "",
        cargo: "",
        email: "",
        cpf: "",
        telefone: "",
        cep: "",
        cidade: "",
        uf: "",
        bairro: "",
        logradouro: "",
        numero: "",
        complemento: "",
    });
    const [parentesco, setParentesco] = useState("");
    
    const [errors, setErrors] = useState({});
    const [hideInput, setInput] = useState(true);

    const validateStep = (step) => {
        const currentErrors = {};
        const stepFields = [
            ["nomeCompleto", "dtNascimento"],
            ["email", "cpf", "telefone"],
            ["cep"],
        ];

        stepFields[step].forEach((field) => {
            if (!formData[field] || formData[field].trim() === "") {
                currentErrors[field] = "Campo em erro";
            }
        });

        setErrors((prev) => ({ ...prev, ...currentErrors }));
        return Object.keys(currentErrors).length === 0;
    };

    const handleParentesco = (e) => {
        setParentesco(e.target.value);
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "cpf") {
            const filteredValue = value.replace(/\D/g, "").slice(0, 11);
            setFormData((prev) => ({ ...prev, [name]: filteredValue }));
            if (value.length < 11) {
                setErrors((prev) => ({ ...prev, [name]: "Cpf deve conter 11 caracteres" }));
            } else {
                setErrors((prev) => ({ ...prev, [name]: "" }));
            }
            return;
        }

        if (name === "telefone") {
            let formattedValue = value.replace(/\D/g, "").slice(0, 11);
            if (formattedValue.length > 0) {
                formattedValue = `${formattedValue.slice(0, 0)}(${formattedValue.slice(0)}`
            } if (formattedValue.length > 3) {
                formattedValue = `${formattedValue.slice(0, 3)}) ${formattedValue.slice(3)}`
            } if (formattedValue.length > 10) {
                formattedValue = `${formattedValue.slice(0, 10)}-${formattedValue.slice(10)}`
            }
            setFormData((prev) => ({ ...prev, [name]: formattedValue }));
            if (value.length < 11) {
                setErrors((prev) => ({ ...prev, [name]: "Número de telefone invalido" }));
            } else {
                setErrors((prev) => ({ ...prev, [name]: "" }));
            }
            return;
        }

        if (name === "cep") {
            let formattedValue = value.replace(/\D/g, "");
            if (formattedValue.length > 5) {
                formattedValue = `${formattedValue.slice(0, 5)}-${formattedValue.slice(5)}`;
            }

            setFormData((prev) => ({ ...prev, [name]: formattedValue }));

            if (formattedValue.trim() !== "") {
                setErrors((prev) => ({ ...prev, [formattedValue]: "" }));
            } else {
                setErrors((prev) => ({ ...prev, [formattedValue]: "Campo em erro" }));
            }

            if (formattedValue.length === 9) {
                api.get(`enderecos?cep=${formattedValue}`)
                    .then((response) => {
                        const endereco = response.data;
                        setFormData((prevState) => ({
                            ...prevState,
                            cidade: endereco.localidade,
                            uf: endereco.uf,
                            bairro: endereco.bairro,
                            logradouro: endereco.logradouro,
                        }));
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar endereço:", error);
                    });
            }

            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (value.trim() !== "") {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: "Campo Obrigatório" }));
        }

    };

    const incrementPartCadastro = () => {
        if (!validateStep(partCadastro)) {
            return;
        }
        if (partCadastro === 3) {
            handleSubmit();
        }
        setPartCadastro(partCadastro + 1);
        setStep(partCadastro + 1)
    };
    const decreasePartCadastro = () => {
        if (partCadastro === 0) {
            setPartCadastro(partCadastro);
            return;
        }
        setPartCadastro(partCadastro - 1);
        setStep(partCadastro - 1)
    };

    const handleSubmit = async () => {
        const data = {
            responsavel: {
              id: null,
              nome: formData.nomeCompleto,
              cpf: formData.cpf,
              telefone: formData.telefone,
              email: formData.email,
              dtNasc: formData.dtNascimento,
              funcao: "RESPONSAVEL",
              endereco: {
                id: null,
                cep: formData.cep,
                uf: formData.uf,
                localidade: formData.cidade,
                bairro: formData.bairro,
                logradouro: formData.logradouro,
                complemento: formData.complemento,
                numero: formData.numero,
              },
            },
            parentesco: parentesco,
          };

        api.put(
            `alunos/${idAluno}/responsavel`, data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then((response) => {
            if (response.status === 200) {
              toast.success("Responsável cadastrado com sucesso!");
              setFormData({
                nomeCompleto: "",
                dtNascimento: "",
                cargo: "",
                email: "",
                cpf: "",
                telefone: "",
                cep: "",
                cidade: "",
                uf: "",
                bairro: "",
                logradouro: "",
                numero: "",
                complemento: "",
              });
              setParentesco("")
              navigate("/secretaria/gerencia/aluno");
            }
          }).catch((error) => {
            toast.error(error.response?.data?.message || error.text || "Erro ao cadastrar Responsável.");
          });
      };

    const handleCheckChange = (event) => {
        setInput(event.target.checked);
    };

    function createData(campo, valorInserido) {
        return { campo, valorInserido };
    }

    const rows = [
        createData("Nome completo", formData.nomeCompleto),
        createData("Data de nascimento", formData.dtNascimento),
        createData("Parentesco", parentesco),
        createData("Email", formData.email),
        createData("CPF", formData.cpf),
        createData("Telefone", formData.telefone),
        createData("CEP", formData.cep),
        createData("Cidade", formData.cidade),
        createData("UF", formData.uf),
        createData("Bairro", formData.bairro),
        createData("Logradouro", formData.logradouro),
        createData("Número", formData.numero),
        createData("Complemento", formData.complemento),
    ];

    return (
        <>
            <section className="flex flex-row align-center h-1/2 w-full justify-center">
                <form className="flex flex-col w-1/2 h-full">
                    {partCadastro === 0 && (
                        <>
                            <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="Nome completo"
                                name="nomeCompleto"
                                variant="outlined"
                                type="text"
                                fullWidth={true}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                value={formData.nomeCompleto}
                                error={!!errors.nomeCompleto}
                                helperText={errors.nomeCompleto}
                            />
                            <TextField
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                id="outlined-basic"
                                label="Data de Nascimento"
                                name="dtNascimento"
                                type="date"
                                variant="outlined"
                                onChange={handleInputChange}
                                value={formData.dtNascimento}
                                error={!!errors.dtNascimento}
                                helperText={errors.dtNascimento}
                            />
                            <FormControl margin="normal" fullWidth>
                                <InputLabel>Parentesco</InputLabel>
                                <Select
                                    name="parentesco"
                                    value={parentesco}
                                    onChange={handleParentesco}
                                    label="Parentesco"
                                    error={!!errors.parentesco}
                                >
                                    <MenuItem value="GENITOR">Genitor</MenuItem>
                                    <MenuItem value="IRMÃO">Irmão</MenuItem>
                                    <MenuItem value="AVÔ">Avô</MenuItem>
                                    <MenuItem value="TIO">Tio</MenuItem>
                                    <MenuItem value="PRIMO">Primo</MenuItem>
                                    <MenuItem value="AUTORIZADO">Autorizado</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                    {partCadastro === 1 && (
                        <>
                            {/* Dados do responsável */}
                            <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="Email"
                                name="email"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleInputChange}
                                value={formData.email}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="CPF"
                                name="cpf"
                                variant="outlined"
                                type="text"
                                fullWidth={true}
                                InputLabelProps={{ shrink: true }}
                                onChange={handleInputChange}
                                value={formData.cpf}
                                error={!!errors.cpf}
                                helperText={errors.cpf}
                            />
                            <div className="flex items-center justify-between">
                                <TextField
                                    margin="normal"
                                    id="outlined-basic"
                                    label="Telefone"
                                    name="telefone"
                                    variant="outlined"
                                    type="text"
                                    placeholder="(11)99999-9999"
                                    className="w-2/5"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleInputChange}
                                    value={formData.telefone}
                                    error={!!errors.telefone}
                                    helperText={errors.telefone}
                                />
                            </div>
                        </>
                    )}
                    {partCadastro === 2 && (
                        <>
                            <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="CEP"
                                name="cep"
                                inputProps={{ maxLength: 9 }}
                                variant="outlined"
                                type="text"
                                placeholder="99999-999"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleInputChange}
                                value={formData.cep}
                            />
                            <div className="flex justify-between">
                                <TextField
                                    disabled
                                    margin="normal"
                                    id="outlined-basic"
                                    label="Cidade"
                                    name="cidade"
                                    variant="outlined"
                                    type="text"
                                    className="w-2/5"
                                    value={formData.cidade}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    disabled
                                    margin="normal"
                                    id="outlined-basic"
                                    label="UF"
                                    name="uf"
                                    variant="outlined"
                                    type="text"
                                    className="w-1/5"
                                    value={formData.uf}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    disabled
                                    margin="normal"
                                    id="outlined-basic"
                                    label="Bairro"
                                    name="bairro"
                                    variant="outlined"
                                    type="text"
                                    className="w-2/6"
                                    value={formData.bairro}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <TextField
                                    disabled
                                    margin="normal"
                                    id="outlined-basic"
                                    label="Logradouro"
                                    name="logradouro"
                                    variant="outlined"
                                    type="text"
                                    className="w-3/6"
                                    value={formData.logradouro}
                                    onChange={handleInputChange}
                                />
                                {!hideInput && (
                                    <TextField
                                        margin="normal"
                                        id="outlined-basic"
                                        label="Número"
                                        name="numero"
                                        variant="outlined"
                                        type="text"
                                        className="w-2/12"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleInputChange}
                                        value={formData.numero}
                                    />
                                )}
                                <FormControlLabel
                                    checked={hideInput}
                                    control={<Checkbox />}
                                    label="Sem número"
                                    onChange={handleCheckChange}
                                />
                            </div>

                            <TextField
                                margin="normal"
                                id="outlined-basic"
                                label="Complemento"
                                name="complemento"
                                variant="outlined"
                                type="text"
                                className="w-full"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleInputChange}
                                value={formData.complemento}
                            />
                        </>
                    )}
                    {partCadastro === 3 && (
                        <>
                            <TableContainer component={Paper} className="h-80">
                                <Table aria-label="simple table">

                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.campo}
                                                sx={{
                                                    "&:last-child td, &:last-child th": { border: 0 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row" sx={{ width: '50%', fontWeight: 600, }} className="text-blue-dash">
                                                    {row.campo}
                                                </TableCell>
                                                <TableCell align="right" sx={{ width: '50%' }}>{row.valorInserido}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                    onClick={partCadastro === 3 ? handleSubmit : incrementPartCadastro}
                >
                    {partCadastro === 3 ? "Finalizar" : "Próximo"}
                </Button>
            </section>
        </>
    );
}

export default FormularioResponsavel;