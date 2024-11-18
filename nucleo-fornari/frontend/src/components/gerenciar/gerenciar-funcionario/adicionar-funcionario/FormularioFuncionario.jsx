import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  capitalize,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
} from "@mui/material";

function FormularioFuncionario({ setStep }) {
  const navigate = useNavigate();

  const [partCadastro, setPartCadastro] = useState(0);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    ra: "",
    dtNascimento: "",
    restricaoAlimentar: false,
    tipoRestricao: [],
    laudoPsicologo: false,
    Observacao: "",
    nomeCompletoResponsavel: "",
    cpfResponsavel: "",
    emailResponsavel: "",
    telefone: "",
    parentesco: "",
    cep: "",
    cidade: "",
    uf: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  const incrementPartCadastro = () => {
    if (partCadastro === 3) {
      finalizarFormulario();
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
  const finalizarFormulario = () => {
    navigate("/secretaria/gerencia/funcionario");
  };

  const [showTable, setShowTable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [hideInput, setInput] = useState(true);

  const handleCheckChange = (event) => {
    setInput(event.target.checked);
  };

  const [showUpload, setUpload] = useState(false);

  const handleRadioChange = (event) => {
    if (event.target.value === "sim") {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  };

  const handleLaudoChange = (event) => {
    if (event.target.value === "sim") {
      setUpload(true);
    } else {
      setUpload(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados completos:", formData);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <>
      <section className="flex flex-row align-center h-1/2 w-full justify-center">
        {/* <div className="steps">
          {["Aluno", "Adicionais", "Responsável", "Endereços", "Finalizar"].map(
            (label, index) => (
              <div key={index} className="step">
                <div
                  className={`circle ${index === partCadastro ? "active" : ""}`}
                >
                  {index + 1}
                </div>
                <span>{label}</span>
                {index < 4 && <hr />}
              </div>
            )
          )}
        </div> */}

        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 h-full">
          {partCadastro === 0 && (
            <>
              <TextField
                margin="normal"
                id="outlined-basic"
                label="Nome completo"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                id="outlined-basic"
                label="RA"
                variant="outlined"
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                label="Data de Nascimento"
                type="date"
                variant="outlined"
                value={formData.dtNascimento}
                onChange={handleInputChange}
              />
            </>
          )}
          {partCadastro === 1 && (
            <>
              {/* Dados do responsável */}
              <TextField
                margin="normal"
                id="outlined-basic"
                label="Nome completo"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                id="outlined-basic"
                label="CPF"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
              />
              <div className="flex items-center justify-between">
                <TextField
                  margin="normal"
                  id="outlined-basic"
                  label="Telefone"
                  variant="outlined"
                  type="text"
                  placeholder="(11)99999-9999"
                  className="w-2/5"
                  onChange={handleInputChange}
                />
                <Box sx={{ width: "40%", paddingTop: "6.5px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Parentesco
                    </InputLabel>
                    <Select
                      className="2/5"
                      fullWidth={true}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Parentesco"
                    >
                      <MenuItem>Selecione</MenuItem>
                      <MenuItem value={20}>Mãe/Pai</MenuItem>
                      <MenuItem value={30}>Irmã/Irmão</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </>
          )}
          {partCadastro === 2 && (
            <>
              <TextField
                margin="normal"
                id="outlined-basic"
                label="CEP"
                variant="outlined"
                type="text"
                placeholder="99999-999"
                onChange={handleInputChange}
              />
              <div className="flex justify-between">
                <TextField
                  disabled
                  margin="normal"
                  id="outlined-basic"
                  label="Cidade"
                  variant="outlined"
                  type="text"
                  className="w-2/5"
                  onChange={handleInputChange}
                />
                <TextField
                  disabled
                  margin="normal"
                  id="outlined-basic"
                  label="UF"
                  variant="outlined"
                  type="text"
                  className="w-1/5"
                  onChange={handleInputChange}
                />
                <TextField
                  disabled
                  margin="normal"
                  id="outlined-basic"
                  label="Bairro"
                  variant="outlined"
                  type="text"
                  className="w-2/6"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <TextField
                  disabled
                  margin="normal"
                  id="outlined-basic"
                  label="Logradouro"
                  variant="outlined"
                  type="text"
                  className="w-3/6"
                  onChange={handleInputChange}
                />
                {!hideInput && (
                  <TextField
                    margin="normal"
                    id="outlined-basic"
                    label="Número"
                    variant="outlined"
                    type="text"
                    className="w-2/12"
                    onChange={handleInputChange}
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
                variant="outlined"
                type="text"
                className="w-full"
                onChange={handleInputChange}
              />
            </>
          )}
          {partCadastro === 3 && (
            <>
              <div className="flex gap-10 justify-between">
                <div className="flex flex-col gap-2">
                  <span>Nome completo aluno: </span>
                  <span>RA: </span>
                  <span>Data ascimento: </span>
                  <span>Restrição alimentar: </span>
                  <span>laudo psicologico: </span>
                  <span>Nome completo responsavel: </span>
                  <span>Cpf responsavel: </span>
                  <span>Email: </span>
                  <span>telefone: </span>
                  <span>parentesco: </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span>Cep: </span>
                  <span>Cidade: </span>
                  <span>Uf:</span>
                  <span>Bairro: </span>
                  <span>Rua: </span>
                  <span>Número: </span>
                  <span>Complemento</span>
                </div>
              </div>
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
          {partCadastro === 3 ? "Finalizar" : "Próximo"}
        </Button>
      </section>
    </>
  );
}

export default FormularioFuncionario;
