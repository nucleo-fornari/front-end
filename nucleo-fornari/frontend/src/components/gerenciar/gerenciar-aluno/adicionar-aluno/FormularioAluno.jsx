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
  Paper,
  Radio,
  RadioGroup,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";

function FormularioAluno({ setStep }) {
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


  const etapasCadastro = [
    {
      name: "/secretaria/cadastro/aluno",
      parte1: "Aluno",
      parte2: "Adicionais",
      parte3: "Responsável",
      parte4: "Endereços",
      parte5: "Finalizar",
    },
    {
      name: "/secretaria/cadastro/funcionario",
    },
  ];

  const incrementPartCadastro = () => {
    if (partCadastro === 4) {
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
    navigate("/secretaria/gerencia/aluno");
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

  function createData(campo, valorInserido) {
    return { campo, valorInserido };
  }

  const rows = [
    createData("Nome completo", "valorInserido"),
    createData("RA", "valorInserido"),
    createData("Data de nascimento", "valorInserido"),
    createData("Restrições alimentares", "valorInserido"),
    createData("Possui laudo psicológico?", "valorInserido"),
    createData("CPF do responsável", "valorInserido"),
    createData("Email", "valorInserido"),
    createData("Telefone", "valorInserido"),
    createData("Parentesco", "valorInserido"),
    createData("CEP", "valorInserido"),
    createData("Cidade", "valorInserido"),
    createData("UF", "valorInserido"),
    createData("Bairro", "valorInserido"),
    createData("Logradouro", "valorInserido"),
    createData("Número", "valorInserido"),
    createData("Complemento", "valorInserido"),
  ];

  //Stepper

 

  return (
    <>
      <section className="flex flex-row align-center h-1/2 w-full justify-center">
        {/* logica do antigo stepper estava aqui */}

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
              <FormLabel id="demo-row-radio-buttons-group-label">
                O aluno possui restrições alimentares?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="sim"
                  control={<Radio />}
                  label="Sim"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="nao"
                  control={<Radio />}
                  label="Não"
                  onChange={handleRadioChange}
                />
              </RadioGroup>
              {showTable && (
                <>
                  <FormGroup className="flex flex-wrap w-full max-h-28">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Peixes e frutos do mar"
                      className="w-1/2"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Trigo"
                      className="w-1/2"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Ovos"
                      className="w-1/2"
                    />
                  </FormGroup>
                  <TextField label="Outros:" className="flex-none" />
                </>
              )}

              <FormLabel id="demo-row-radio-buttons-group-label">
                O aluno possui laudo psicológico?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  id="laudo"
                  value="sim"
                  control={<Radio />}
                  label="Sim"
                  onChange={handleLaudoChange}
                />
                <FormControlLabel
                  id="laudo"
                  value="nao"
                  control={<Radio />}
                  label="Não"
                  onChange={handleLaudoChange}
                />
              </RadioGroup>
              {showUpload && (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                >
                  Adicionar laudo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
              )}
            </>
          )}
          {partCadastro === 2 && (
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
          {partCadastro === 3 && (
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
          {partCadastro === 4 && (
            <>
              <TableContainer component={Paper} className="h-80">
                <Table  aria-label="simple table">
                
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.campo}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" sx={{width:'50%', fontWeight:600,}} className="text-blue-dash">
                          {row.campo}
                        </TableCell>
                        <TableCell align="right" sx={{width:'50%'}}>{row.valorInserido}</TableCell>
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
          onClick={incrementPartCadastro}
        >
          {partCadastro === 4 ? "Finalizar" : "Próximo"}
        </Button>
      </section>
    </>
  );
}

export default FormularioAluno;
