import React, { useCallback, useState } from "react";
import "./ModalSolicitarReuniao.css"
import ModalOverlayComponent from "../modal-overlay/ModalOverlay";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs-plugin-utc';
import useApi from "../../hooks/ApiHook";
import { toast } from "react-toastify";

dayjs.extend(utc);

const ModalSolicitarReuniaoComponent = ({ handleClose, filhosComSala, rows, setRows }) => {
  
  const api = useApi();

  const [agendamento, setAgendamento] = useState({
    responsavelId: sessionStorage.ID,
    salaId: "",
    motivo: "",
    aceito: false,
    descricao: "",
    data: "",
  });

  const [selectedAlunoId, setSelectedAlunoId] = useState("");

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setAgendamento((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectAluno = useCallback((event) => {
    const salaId = event.target.value;
    setSelectedAlunoId(salaId);
    setAgendamento((prev) => ({
      ...prev,
      salaId,
    }));
  }, []);

  const handleDateTime = useCallback((event) => {
    const newValue = event ? event.toISOString() : "";
    setAgendamento((prev) => ({
      ...prev,
      data: newValue,
    }));
  }, []);

  const isSubmitDisabled = () => {
    return (
      !agendamento.motivo ||
      !selectedAlunoId ||
      !agendamento.data
    );
  };

  const handleSubmit = useCallback(async () => {
    const agendamentoData = {
      responsavelId: sessionStorage.ID,
      salaId: agendamento.salaId,
      motivo: agendamento.motivo,
      descricao: agendamento.descricao,
      data: agendamento.data,
    };
    try {
      const response = await api.post("agendamento/proposta", agendamentoData);
      setRows((prevAgendamentos) => [...prevAgendamentos, response.data]);
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.text || "Erro ao solicitar reunião");
      console.error("Erro ao solicitar reunião:", error.response?.data || error.message);
    }
  }, [agendamento, api, setRows, handleClose]);

  return (
    <ModalOverlayComponent>
      <div class="containner-form">
        <div className="flex flex-col justify-between h-full">

          <div className="flex flex-row align-center justify-between">
            <p style={{ fontWeight: "bold", color: "#000" }}>SOLICITAR REUNIÃO</p>
            <CloseIcon fontSize="medium" onClick={handleClose} style={{ cursor: "pointer" }} />
          </div>

          <div className="flex flex-row justify-between mt-5">
            <div className="w-2/5">
              <label>Escolha o Motivo</label>
              <FormControl sx={{ width: "100%", marginTop: "12px" }} size="small">
                <InputLabel id="motivo-label">Motivo</InputLabel>
                <Select
                  label="Motivo"
                  name="motivo"
                  value={agendamento.motivo}
                  onChange={handleChange}
                >
                  <MenuItem value="administrativo">Administrativo</MenuItem>
                  <MenuItem value="documentacao">Documentação</MenuItem>
                  <MenuItem value="denuncia">Denúncia</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="w-2/5">
              <label className=" mt-5">Selecione o Filho</label>
              <FormControl sx={{ width: "100%", marginTop: "12px" }} size="small">
                <InputLabel id="aluno-label">Filho</InputLabel>
                <Select
                  label="Filho"
                  id="aluno"
                  value={selectedAlunoId}
                  onChange={handleSelectAluno}
                >
                  {!Array.isArray(filhosComSala) || filhosComSala.length === 0 ? (
                    <MenuItem value="" disabled>
                      Nenhum filho
                    </MenuItem>
                  ) : (
                    filhosComSala.map(filho => (
                      <MenuItem key={filho.idSala} value={filho.idSala}>
                        {filho.nome}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>
          </div>

          <label className="mt-5">Selecione a Data e Hora</label>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br"
            sx={{ width: "50%" }}
          >
            <DateTimePicker
              value={dayjs(agendamento.data)}
              onChange={handleDateTime}
              slotProps={{
                textField: {
                  size: "small",
                  sx: {
                    width: "55%",
                    marginTop: "5px",
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#bdbdbd',
                      },
                      '&:hover fieldset': {
                        borderColor: '#000',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    }
                  }
                }
              }}
            />
          </LocalizationProvider>

          <label className="mt-5">Descreva a solicitação</label>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { width: "100%", marginTop: "12px" } }}
            noValidate
            autoComplete="off"
          >
            <div>
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


          <div className="flex flex-row align-center justify-end gap-5 mt-8">
            <button onClick={handleClose} className="rounded-lg px-4 py-2" style={{ border: "1px solid black" }}>
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className={`rounded-lg px-4 py-2 text-white-ice ${isSubmitDisabled() ? "bg-gray-400" : "bg-blue-dash"}`}
              disabled={isSubmitDisabled()}
            >
              Solicitar
            </button>
          </div>
        </div>
      </div>
    </ModalOverlayComponent>
  )
}

export default ModalSolicitarReuniaoComponent;