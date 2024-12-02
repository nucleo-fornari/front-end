import {useEffect, useState } from "react";
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
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../../../services/api";

function FormularioAluno({ setStep }) {
  const navigate = useNavigate();

  const [partCadastro, setPartCadastro] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nomeCompleto: "Felipe Villa do Conde",
    ra: "0123123",
    dtNascimento: "2020-08-06",
    restricaoAlimentar: true,
    tipoRestricao: ["1", "2"],
    laudoPsicologo: true,
    Observacao: "Aspectro autista",
    nomeResponsavel: "Juliana Villa do Conde",
    cpf: "91048265072",
    email: "julianna@gmail.com",
    dtNascimentoResponsavel: "2000-12-12",
    telefone: "(11) 94988-8888",
    parentesco: "GENITOR",
    cep: "04724-003",
    cidade: "São Paulo",
    uf: "SP",
    bairro: "Santo Amaro",
    logradouro: "Avenida João Dias",
    numero: "447",
    complemento: "casa",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [restricaoData, setRestricaoData] = useState([])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const loadRestricoes = () => {
    api.get("/restricoes").then((res) => {
      setRestricaoData(res.data)
    }).catch((error) => console.log(error));
  }
  useEffect(() => {
    loadRestricoes();
  }, []);

  const validateStep = (step) => {
    const currentErrors = {};
    const stepFields = [
      ["nomeCompleto", "ra", "dtNascimento"],
      ["restricaoAlimentar", "laudoPsicologo"],
      ["nomeResponsavel", "cpf", "email", "dtNascimentoResponsavel", "telefone", "parentesco"],
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

    if (name === "ra") {
      const filteredValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: filteredValue }));
      if (value !== "") {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "Campo em erro" }));
      }
      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedFormData = {
          ...prev,
          [name]: checked
            ? [...(prev[name] || []), value]
            : (prev[name] || []).filter((item) => item !== value),
        };
  
        if (value === "Outro" && !checked) {
          updatedFormData.restricaoAlimentarOutros = "";
        }
  
        return updatedFormData;
      });
      return;
    }

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
      }if (formattedValue.length > 3) {
        formattedValue = `${formattedValue.slice(0, 3)}) ${formattedValue.slice(3)}`
      }if (formattedValue.length > 10) {
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
      let formattedValue = value.replace(/\D/g, "").slice(0, 8);
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

    console.log(formData);
    if (value !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "Campo obrigatório" }));
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

  const [showTable, setShowTable] = useState(true);
  const [hideInput, setInput] = useState(false);
  const [showUpload, setUpload] = useState(true);

  const handleCheckChange = (event) => {
    setInput(event.target.checked);
  };

  const handleRadioChange = (event) => {
    if (event === true) {
      setShowTable(true);
    } else {
      setShowTable(false);
      setFormData((prev) => ({
        ...prev,
        tipoRestricao: [],
        restricaoAlimentarOutros: ""
      }))
    }
  };

  const handleLaudoChange = (event) => {
    if (event === true) {
      setUpload(true);
    } else {
      setUpload(false);
    }
  };

  const handleSubmit = () => {

    const obj = JSON.stringify({
      id: null,
      ra: formData.ra,
      nome: formData.nomeCompleto,
      laudado: formData.laudoPsicologo,
      dtNasc: formData.dtNascimento,
      observacoes: formData.Observacao,
      filiacao: {
        responsavel: {
          id: null,
          nome: formData.nomeResponsavel,
          cpf: formData.cpf,
          email: formData.email,
          telefone: formData.telefone,
          dtNasc: formData.dtNascimentoResponsavel,
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
          }
        },
        parentesco: formData.parentesco
      },
      restricoes: formData.tipoRestricao
    })

    // console.log(obj);
    const requestBody = new FormData();
    requestBody.append("body", obj)

    requestBody.append("laudo", selectedFile)

    api.post("/alunos", requestBody, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.status === 201) {
        toast.success("Aluno cadastrado com sucesso!");
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
          cpf: "",
          email: "",
          dtNascimentoResponsavel: "",
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
    }).catch((error) => {
      console.error(error);
      if(error.response.data.message === "Data de nascimento inválida. A idade deve estar entre 0 e 6 anos.") {
        setPartCadastro(0)
        
        setErrors((prev) => ({ ...prev, [`dtNascimento`]: "A idade deve estar entre 0 e 6 anos." }));
      }else if(error.response.data.message === "CPF inválido. Por favor, verifique se foi digitado corretamente.") {
        setPartCadastro(2)

        setErrors((prev) => ({ ...prev, [`cpf`]: "Verifique se foi digitado corretamente." }));
      }

      toast.error(error.response?.data?.message || error.text || "Erro ao cadastrar Aluno.");
    });
  };

  function createData(campo, valorInserido) {
    return { campo, valorInserido };
  }

  const rows = [
    createData("Nome completo", formData.nomeCompleto),
    createData("RA", formData.ra),
    createData("Data de nascimento", formData.dtNascimento),
    createData("Restrições alimentares", formData.restricaoAlimentar ? "Sim" : "Não"),
    createData("Possui laudo psicológico?", formData.laudoPsicologo ? "Sim" : "Não"),
    createData("Observação", formData.Observacao),
    createData("Nome do responsavel", formData.nomeResponsavel),
    createData("CPF do responsável", formData.cpf),
    createData("Email", formData.email),
    createData("Data de nascimento Responsavel", formData.dtNascimentoResponsavel),
    createData("Telefone", formData.telefone),
    createData("Parentesco", formData.parentesco),
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
              <TextField
                margin="normal"
                id="outlined-basic"
                label="Observação"
                name="Observacao"
                variant="outlined"
                type="text"
                fullWidth={true}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                value={formData.Observacao}
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
                value={formData.restricaoAlimentar}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Sim"
                  name="restricaoAlimentar"
                  onChange={() => handleRadioChange(true)}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Não"
                  name="restricaoAlimentar"
                  onChange={() => handleRadioChange(false)}
                />
              </RadioGroup>
              {showTable && (
                <>
                  <FormGroup className="flex flex-wrap w-full max-h-28">
                    {Array.isArray(restricaoData) && restricaoData.length > 0 ? restricaoData.map((restricao) => (
                      <FormControlLabel
                        key={restricao.id}
                        control={<Checkbox
                          value={restricao.id}
                          name="tipoRestricao"
                          checked={formData.tipoRestricao?.includes(`${restricao.id}`)}
                          onChange={handleInputChange}
                        />}
                        label={restricao.tipo}
                        className="w-1/2"
                      />
                    )) : <p>Nenhuam restrição encontrada</p>}
                  </FormGroup>                  
                </>
              )}

              <FormLabel id="demo-row-radio-buttons-group-label">
                O aluno possui laudo psicológico?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="laudoPsicologo"
                value={formData.laudoPsicologo}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  id="laudo"
                  value={true}
                  control={<Radio />}
                  label="Sim"
                  name="laudoPsicologo"
                  onChange={()=> handleLaudoChange(true)}
                />
                <FormControlLabel
                  id="laudo"
                  value={false}
                  control={<Radio />}
                  label="Não"
                  name="laudoPsicologo"
                  onChange={()=> handleLaudoChange(false)}
                />
              </RadioGroup>
              {showUpload && (
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <Typography variant="h5">Upload de Arquivo</Typography>

                  {/* Input para selecionar o arquivo */}
                  <input
                    id="upload-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="upload-input">
                    <Button variant="contained" component="span">
                      Selecionar Arquivo
                    </Button>
                  </label>

                  {/* Exibe o nome do arquivo selecionado */}
                  {selectedFile && (
                    <Typography variant="body1">Arquivo: {selectedFile.name}</Typography>
                  )}

                  {/* Exibe o status */}
                </Box>
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
              <TextField
                margin="normal"
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                label="Data de Nascimento"
                name="dtNascimentoResponsavel"
                type="date"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.dtNascimentoResponsavel}
                error={!!errors.dtNascimentoResponsavel}
                helperText={errors.dtNascimentoResponsavel}
              />
              <div className="flex items-center justify-between">
                <TextField
                  margin="normal"
                  id="outlined-basic"
                  label="Telefone"
                  name="telefone"
                  variant="outlined"
                  type="text"
                  placeholder="(11) 99999-9999"
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
                      value={formData.parentesco || ""}
                      onChange={handleInputChange}
                    >
                      {/*CORRIJA OS VALORES DO SELECT !!*/}
                      {/*GENITOR|IRMÃO|AVÔ|TIO|PRIMO*/}
                      <MenuItem value="GENITOR">Mãe/Pai</MenuItem>
                      <MenuItem value="IRMÃO">Irmã/Irmão</MenuItem>
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
                  InputLabelProps={{ shrink: true }}
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
          onClick={partCadastro === 4 ? handleSubmit : incrementPartCadastro}
        >
          {partCadastro === 4 ? "Finalizar" : "Próximo"}
        </Button>
      </section>
    </>
  );
}

export default FormularioAluno;
