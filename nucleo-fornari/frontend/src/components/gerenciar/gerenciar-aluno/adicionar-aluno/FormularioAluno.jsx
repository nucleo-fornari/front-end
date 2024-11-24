import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import api from "../../../../services/api";

function FormularioAluno({ setStep }) {
  const navigate = useNavigate();

  const [partCadastro, setPartCadastro] = useState(0);  
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    ra: "",
    dtNascimento: "",
    restricaoAlimentar: "",
    tipoRestricao: [],
    restricaoAlimentarOutros: "",
    laudoPsicologo: "",
    Observacao: "",
    nomeResponsavel: "",
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

  const validateStep = (step) => {
    const currentErrors = {};
    const stepFields = [
      ["nomeCompleto", "ra", "dtNascimento"],
      ["restricaoAlimentar", "laudoPsicologo"],
      ["nomeResponsavel", "cpf", "email", "telefone", "parentesco"],
      ["cep"]
    ];
  
    stepFields[step].forEach((field) => {
      if (!formData[field] || formData[field] === "") {
        currentErrors[field] = "Campo em erro";
      }
    });
  
    setErrors((prev) => ({ ...prev, ...currentErrors }));
    return Object.keys(currentErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((item) => item !== value), 
      }));
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

    if (value !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "Campo em erro" }));
    }
    
  };

  const incrementPartCadastro = () => {
    if (!validateStep(partCadastro)) {
      return;
    }  
    if (partCadastro === 4) {
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

  const [showTable, setShowTable] = useState(false);
  const [hideInput, setInput] = useState(true);
  const [showUpload, setUpload] = useState(false);

  const handleCheckChange = (event) => {
    setInput(event.target.checked);
  };  

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

  const handleSubmit = async () => {
    if (!validateStep(partCadastro)) {
      setPartCadastro(partCadastro);
      return;
    } 

    try {
      const response = await api.post("/usuarios/funcionario", formData);
      if (response.status === 201) {
        toast.success("Funcionário cadastrado com sucesso!");
        setFormData({
          nomeCompleto: "",
          ra: "",
          dtNascimento: "",
          restricaoAlimentar: "",
          tipoRestricao: [],
          restricaoAlimentarOutros: "",
          laudoPsicologo: "",
          Observacao: "",
          nomeResponsavel: "",
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
        navigate("/secretaria/gerencia/aluno");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar funcionário.");
    }
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
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 h-full">
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
                id="outlined-basic"
                label="RA"
                name="ra"
                variant="outlined"
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                value={formData.ra}
                error={!!errors.ra}
                helperText={errors.ra}
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
                name="restricaoAlimentar"
                value={formData.restricaoAlimentar || ""}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="sim"
                  control={<Radio />}
                  label="Sim"
                  name="restricaoAlimentar"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="nao"
                  control={<Radio />}
                  label="Não"
                  name="restricaoAlimentar"
                  onChange={handleRadioChange}
                />
              </RadioGroup>
              {showTable && (
                <>
                  <FormGroup className="flex flex-wrap w-full max-h-28">
                    <FormControlLabel
                      control={<Checkbox 
                        value="Peixes e frutos do mar"
                        checked={formData.tipoRestricao.includes("Peixes e frutos do mar")}
                        onChange={handleInputChange}
                        />}
                      label="Peixes e frutos do mar"
                      className="w-1/2"
                    />
                    <FormControlLabel
                      control={<Checkbox 
                        value="Trigo"
                        checked={formData.tipoRestricao.includes("Trigo")}
                        onChange={handleInputChange}
                        />}
                      label="Trigo"
                      className="w-1/2"
                    />
                    <FormControlLabel
                      control={<Checkbox 
                        value="Ovos"
                        checked={formData.tipoRestricao.includes("Ovos")}
                        onChange={handleInputChange}
                        />}
                      label="Ovos"
                      className="w-1/2"
                    />
                  </FormGroup>
                  <TextField 
                  label="Outros:" 
                  className="flex-none" 
                  name="restricaoAlimentarOutros"
                  value={formData.restricaoAlimentarOutros}
                  onChange={handleInputChange}
                  />
                </>
              )}

              <FormLabel id="demo-row-radio-buttons-group-label">
                O aluno possui laudo psicológico?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="laudoPsicologo"
                value={formData.laudoPsicologo || ""}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  id="laudo"
                  value="sim"
                  control={<Radio />}
                  label="Sim"
                  name="laudoPsicologo"
                  onChange={handleLaudoChange}
                />
                <FormControlLabel
                  id="laudo"
                  value="nao"
                  control={<Radio />}
                  label="Não"
                  name="laudoPsicologo"
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
                label="Nome Responsavel"
                name="nomeResponsavel"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                value={formData.nomeResponsavel}
                error={!!errors.nomeResponsavel}
                helperText={errors.nomeResponsavel}
              />
              <TextField
                margin="normal"
                id="outlined-basic"
                label="CPF"
                name="cpf"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                value={formData.cpf}
                error={!!errors.cpf}
                helperText={errors.cpf}
              />
              <TextField
                margin="normal"
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                value={formData.email}
                error={!!errors.email}
                helperText={errors.email}
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
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  value={formData.telefone}
                  error={!!errors.telefone}
                  helperText={errors.telefone}
                />
                <Box sx={{ width: "40%", paddingTop: "6.5px" }}>
                  <FormControl fullWidth error={!!errors.parentesco}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Parentesco
                    </InputLabel>
                    <Select
                      className="2/5"
                      fullWidth={true}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Parentesco"
                      name="parentesco"
                      value={formData.parentesco}
                      onChange={handleInputChange}
                    >
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
                name="cep"
                variant="outlined"
                type="text"
                placeholder="99999-999"
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                value={formData.cep}
                error={!!errors.cep}
                helperText={errors.cep}
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
                  onChange={handleInputChange}
                  value={formData.cidade}
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
                  onChange={handleInputChange}
                  value={formData.uf}
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
                  onChange={handleInputChange}
                  value={formData.bairro}
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
                  onChange={handleInputChange}
                  value={formData.logradouro}
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
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
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
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                value={formData.complemento}
              />
            </>
          )}
          {partCadastro === 4 && (
            <>
              <div className="flex gap-10 justify-between">
                <div className="flex flex-col gap-2">
                  <span>Nome completo aluno: <b>{formData.nomeCompleto}</b></span>
                  <span>RA: <b>{formData.ra}</b> </span>
                  <span>Data ascimento: <b>{formData.dtNascimento}</b> </span>
                  <span>Restrição alimentar: <b>{formData.restricaoAlimentar}</b> </span>
                  <span>laudo psicologico: <b>{formData.laudoPsicologo}</b> </span>
                  <span>Nome completo responsavel: <b>{formData.nomeResponsavel}</b> </span>
                  <span>Cpf responsavel: <b>{formData.cpfResponsavel}</b> </span>
                  <span>Email: <b>{formData.emailResponsavel}</b> </span>
                  <span>telefone: <b>{formData.telefone}</b></span>
                  <span>parentesco: <b>{formData.parentesco}</b> </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span>Cep: <b>{formData.cep}</b> </span>
                  <span>Cidade: <b>{formData.cidade}</b> </span>
                  <span>Uf: <b>{formData.uf}</b></span>
                  <span>Bairro: <b>{formData.bairro}</b> </span>
                  <span>Rua: <b>{formData.rua}</b> </span>
                  <span>Número: <b>{formData.numero}</b> </span>
                  <span>Complemento: <b>{formData.complemento}</b></span>
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
          {partCadastro === 4 ? "Finalizar" : "Próximo"}
        </Button>
      </section>
    </>
  );
}

export default FormularioAluno;
