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
  TextField, Typography,
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const validateStep = (step) => {
    // const currentErrors = {};
    // const stepFields = [
    //   ["nomeCompleto", "ra", "dtNascimento"],
    //   ["restricaoAlimentar", "laudoPsicologo"],
    //   ["nomeResponsavel", "cpf", "email", "telefone", "parentesco"],
    //   ["cep"]
    // ];
    //
    // stepFields[step].forEach((field) => {
    //   if (!formData[field] || formData[field] === "") {
    //     currentErrors[field] = "Campo em erro";
    //   }
    // });
    //
    // setErrors((prev) => ({ ...prev, ...currentErrors }));
    return true;
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

  const handleSubmit = () => {
    // if (!validateStep(partCadastro)) {
    //   setPartCadastro(partCadastro);
    //   return;
    // }

      const curDate = new Date();
      // Falta a data de nascimento do responsável no formulário!!!
      //CPF, email do responsável e laudado não estão sendo armazenados no formdata!!!

      const obj = JSON.stringify({
        id: null,
        ra: formData.ra,
        nome: formData.nomeCompleto,
        laudado: true,
        dtNasc: formData.dtNascimento,
        observacoes: formData.Observacao,
        filiacao: {
          responsavel: {
            id: null,
            nome: formData.nomeResponsavel,
            cpf: "50111980062",
            email: "email@email.com",
            telefone: formData.telefone,
            dtNasc: curDate.toISOString().slice(0, 10),
            funcao: "RESPONSAVEL",
            endereco: {
              id: null,
              cep: formData.cep,
              localidade: formData.cidade,
              uf: formData.uf,
              bairro: formData.bairro,
              numero: formData.numero,
              logradouro: formData.rua,
              complemento: formData.complemento
            }
          },
          parentesco: formData.parentesco
        },
        restricoes: formData.tipoRestricao
      })

    console.log(obj);
    alert(curDate.toISOString().slice(0, 10))
      const requestBody = new FormData();
      requestBody.append("body", obj)

      requestBody.append("laudo", selectedFile)

      api.post("/alunos", requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
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
      }}).catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.message || error.text || "Erro ao cadastrar funcionário.");
      });
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
    createData("Nome completo", formData.nomeCompleto),
    createData("RA", formData.ra),
    createData("Data de nascimento", formData.dtNascimento),
    createData("Restrições alimentares", formData.restricaoAlimentar),
    createData("Possui laudo psicológico?", formData.laudoPsicologo),
    createData("Nome do responsavel", formData.nomeResponsavel),
    createData("CPF do responsável", formData.cpfResponsavel),
    createData("Email", formData.emailResponsavel),
    createData("Telefone", formData.telefone),
    createData("Parentesco", formData.parentesco),
    createData("CEP", formData.cep),
    createData("Cidade", formData.cidade),
    createData("UF", formData.uf),
    createData("Bairro", formData.bairro),
    createData("Logradouro", formData.rua),
    createData("Número", formData.numero),
    createData("Complemento", formData.complemento),
  ];

  //Stepper

 

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
                      {/*CORRIJA OS VALORES DO SELECT !!*/}
                      {/*GENITOR|IRMÃO|AVÔ|TIO|PRIMO*/}
                      <MenuItem value={"GENITOR"}>Mãe/Pai</MenuItem>
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
          onClick={partCadastro === 4 ? handleSubmit : incrementPartCadastro}
        >
          {partCadastro === 4 ? "Finalizar" : "Próximo"}
        </Button>
      </section>
    </>
  );
}

export default FormularioAluno;
