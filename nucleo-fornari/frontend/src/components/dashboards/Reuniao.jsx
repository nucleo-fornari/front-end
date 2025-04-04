import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Modal, Box, Button, Select, MenuItem, FormControl, InputLabel, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import utc from 'dayjs-plugin-utc';
import HeaderBar from '../header-bar/headerBar';

function Reuniao(props) {
  dayjs.extend(utc);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  };

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [filhosComSala, setFilhosComSala] = useState([]);
  const [selectedAlunoId, setSelectedAlunoId] = useState("");
  const [agendamento, setAgendamento] = useState({
    responsavelId: sessionStorage.ID,
    salaId: "",
    motivo: "",
    aceito: false,
    descricao: "",
    data: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectAluno = (event) => {
    const alunoId = event.target.value;
    setSelectedAlunoId(alunoId);

    const alunoSelecionado = filhosComSala.find(filho => filho.id === alunoId);
    if (alunoSelecionado) {
      setAgendamento((prev) => ({
        ...prev,
        salaId: alunoSelecionado.idSala,
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAgendamento((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const selectedAluno = filhosComSala.find(filho => filho.id === selectedAlunoId);
    if (selectedAluno) {
      const agendamentoData = {
        responsavelId: sessionStorage.ID,
        salaId: selectedAluno.idSala,
        motivo: agendamento.motivo,
        descricao: agendamento.descricao,
        data: agendamento.data,
      };
      try {
        const response = await api.post("agendamento/proposta", agendamentoData);
        console.log("Proposta criada com sucesso:", response.data);
        setRows((prevAgendamentos) => [...prevAgendamentos, response.data]);
        handleClose();
      } catch (error) {
        console.error("Erro ao criar a proposta:", error.response?.data || error.message);
      }
    }
  };

  useEffect(() => {
    const usuarioId = sessionStorage.ID;
    if (usuarioId) {
      api.get(`agendamento?usuarioId=${usuarioId}`)
        .then(response => {
          if (response.status === 204) {
            setRows([]);
          } else {
            setRows(response.data);
          }
        })
        .catch(error => {
          console.error("Erro ao buscar agendamentos:", error);
        });

      api.get(`/usuarios/aluno-e-sala/${usuarioId}`)
        .then((response) => {
          setFilhosComSala(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar filhos e salas:", error);
        });
    }
  }, []);

  return (
    <>
      <HeaderBar title={"Reunião"} />
      <div className="flex flex-col p-12">

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow className="bg-blue-main">
                <TableCell sx={{ color: "white", fontSize: 20 }}>Motivo</TableCell>
                <TableCell sx={{ color: "white", fontSize: 20 }} align="center">Data</TableCell>
                <TableCell sx={{ color: "white", fontSize: 20 }} align="center">Aceito</TableCell>
                <TableCell sx={{ color: "white", fontSize: 20 }} align="center">Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.motivo}</TableCell>
                  <TableCell align="center">
                    {dayjs(row.data).utc().local().format('DD-MM-YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="center">{row.aceito ? "Sim" : "Não"}</TableCell>
                  <TableCell align="center">{row.descricao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="w-full flex justify-center p-5">
          <Button variant="contained" onClick={handleOpen}>Solicitar Reunião</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 700 }}>
              <div className="flex flex-col w-full justify-center items-center bg-white-ice p-5 rounded-3xl shadow-2xl">
                {/* Campo: Motivo da Solicitação */}
                <div className="flex flex-col justify-center items-center">
                  <label className="text-3xl mt-5">Motivo da Solicitação</label>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="motivo-label">Motivo</InputLabel>
                    <Select
                      labelId="motivo-label"
                      id="motivo"
                      value={agendamento.motivo}
                      onChange={handleChange}
                      name="motivo"
                    >
                      <MenuItem value="">
                        <em>Selecione</em>
                      </MenuItem>
                      <MenuItem value="administrativo">Administrativo</MenuItem>
                      <MenuItem value="documentacao">Documentação</MenuItem>
                      <MenuItem value="denuncia">Denúncia</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Campo: Seleção de Filho */}
                <div className="flex flex-col justify-center items-center">
                  <label className="text-3xl mt-5">Selecione o Filho</label>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="aluno-label">Filho</InputLabel>
                    <Select
                      labelId="aluno-label"
                      id="aluno"
                      value={selectedAlunoId}
                      onChange={handleSelectAluno}
                    >
                      <MenuItem value="">
                        <em>Selecione</em>
                      </MenuItem>
                      {filhosComSala.map(filho => (
                        <MenuItem key={filho.id} value={filho.id}>
                          {filho.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/* Campo: Data e Hora */}
                <div className="flex flex-col justify-center items-center">
                  <label className="text-3xl mt-5">Data e Hora</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <DateTimePicker
                      value={dayjs(agendamento.data)}
                      onChange={(newValue) => setAgendamento({ ...agendamento, data: newValue.toISOString() })}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>

                {/* Campo: Descrição */}
                <div className="flex flex-col justify-center items-center">
                  <Box
                    component="form"
                    sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <div className="mt-5">
                      <TextField
                        id="descricao"
                        label="Descreva"
                        multiline
                        rows={4}
                        value={agendamento.descricao}
                        onChange={handleChange}
                        name="descricao"
                      />
                    </div>
                  </Box>
                </div>

                {/* Botão para enviar */}
                <div className="mt-5">
                  <Button variant="contained" onClick={handleSubmit}>
                    Enviar
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Reuniao;