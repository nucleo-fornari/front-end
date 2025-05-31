import React, { useState } from "react";
import "./ModalSolicitarReuniao.css"
import ModalOverlayComponent from "../modal-overlay/ModalOverlay";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs-plugin-utc';

const ModalSolicitarReuniaoComponent = ({ onClose, filhosComSala }) => {
  dayjs.extend(utc);

  const [agendamento, setAgendamento] = useState({
    responsavelId: sessionStorage.ID,
    salaId: "",
    motivo: "",
    aceito: false,
    descricao: "",
    data: "",
  });

  return (
    <ModalOverlayComponent>
      <div class="containner-form">
        <div className="flex flex-col justify-between h-full">

          <div className="flex flex-row align-center justify-between">
            <p style={{ fontWeight: "bold", color: "#000" }}>SOLICITAR REUNIÃO</p>
            <CloseIcon fontSize="medium" onClick={onClose} style={{ cursor: "pointer" }} />
          </div>

          <div className="flex flex-row justify-between mt-5">
            <div>
              <label>Escolha o Motivo</label>
              <FormControl sx={{ width: "100%", marginTop: "12px" }} size="small">
                <InputLabel id="motivo-label">Motivo</InputLabel>
                <Select
                  label="Motivo"
                  name="motivo"
                >
                  <MenuItem value="administrativo">Administrativo</MenuItem>
                  <MenuItem value="documentacao">Documentação</MenuItem>
                  <MenuItem value="denuncia">Denúncia</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <label className=" mt-5">Selecione o Filho</label>
              <FormControl sx={{ width: "100%", marginTop: "12px" }} size="small">
                <InputLabel id="aluno-label">Filho</InputLabel>
                <Select
                  label="Filho"
                  id="aluno"
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
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
            sx={{ width: "50%" }}
          >
            <DateTimePicker
              value={agendamento.data ? dayjs(agendamento.data) : null}
              onChange={(newValue) => {
                setAgendamento({ ...agendamento, data: newValue ? newValue.toISOString() : "" });
              }}
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
                name="descricao"
              />
            </div>
          </Box>


          <div className="flex flex-row align-center justify-end gap-5 mt-5">
            <button onClick={onClose} className="rounded-lg px-4 py-2" style={{ border: "1px solid black" }}>
              Cancelar
            </button>
            <button className="bg-blue-dash text-white-ice rounded-lg px-4 py-2">
              Solicitar
            </button>
          </div>
        </div>
      </div>
    </ModalOverlayComponent>
  )
}

export default ModalSolicitarReuniaoComponent;