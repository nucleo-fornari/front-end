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
import api from "../../../../services/api";

function FormularioFuncionario({ setStep }) {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "cep" && value.length === 9) {
      api.get(`enderecos?cep=${value}`)
        .then((response) => {
          console.log(response.data)

          const endereco = response.data;
          setFormData((prevState) => ({
            ...prevState,
            cidade: endereco.localidade,
            uf: endereco.uf,
            bairro: endereco.bairro,
            logradouro: endereco.logradouro,
          }));
        })
        .catch ((error) => {
        console.error("Erro ao buscar endereço:", error);
      })
    }
  };

  const [hideInput, setInput] = useState(true);

  const handleCheckChange = (event) => {
    setInput(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados completos:", formData);
  };

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
              />
              <TextField
                margin="normal"
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                label="Data de Nascimento"
                name="dtNascimento"
                type="date"
                variant="outlined"
                value={formData.dtNascimento}
                onChange={handleInputChange}
              />
              <Box sx={{ width: "40%", paddingTop: "6.5px" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Cargo
                  </InputLabel>
                  <Select
                    className="2/5"
                    fullWidth={true}
                    label="Cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Secretaria">Secretaria</MenuItem>
                    <MenuItem value="Professor">Professor</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
                onChange={handleInputChange}
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
                maxLength={9}
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
                name="complemento"
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
                  <span>Nome completo: <b>{formData.nomeCompleto}</b></span>
                  <span>Data Nascimento: <b>{formData.dtNascimento}</b></span>
                  <span>Cargo: <b>{formData.cargo}</b></span>
                  <span>Email: <b>{formData.email}</b></span>
                  <span>Cpf: <b>{formData.cpf}</b></span>
                  <span>Telefone: <b>{formData.telefone}</b></span>
                </div>
                <div className="flex flex-col gap-2 Q ">
                  <span>Cep: <b>{formData.cep}</b></span>
                  <span>Cidade: <b>{formData.cidade}</b></span>
                  <span>Uf: <b>{formData.uf}</b></span>
                  <span>Bairro: <b>{formData.bairro}</b></span>
                  <span>Logradouro: <b>{formData.logradouro}</b></span>
                  <span>numero: <b>{formData.numero}</b></span>
                  <span>complemento: <b>{formData.complemento}</b></span>
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
