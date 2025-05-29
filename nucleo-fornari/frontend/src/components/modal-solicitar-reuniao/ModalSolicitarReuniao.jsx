import React from "react";
import "./ModalSolicitarReuniao.css"
import ModalOverlayComponent from "../modal-overlay/ModalOverlay";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalSolicitarReuniaoComponent = () => {
  return (
    <ModalOverlayComponent>
      <div class="containner-form">
        <div className="flex flex-col justify-center">

          <div className="flex flex-row align-center justify-between">
            <p>SOLICITAR REUNIÃO</p>            
            <CloseIcon fontSize="medium"/>
          </div>

          <FormControl sx={{ width: "40%", marginTop: "20px" }}>
            <InputLabel id="motivo-label">Motivo</InputLabel>
            <Select
              label="motivo"
              name="motivo"
            >
              <MenuItem value="administrativo">Administrativo</MenuItem>
              <MenuItem value="documentacao">Documentação</MenuItem>
              <MenuItem value="denuncia">Denúncia</MenuItem>
              <MenuItem value="outro">Outro</MenuItem>
            </Select>
          </FormControl>

          <div className="flex flex-row align-center justify-end gap-5 mt-5">
            <button className="rounded-lg px-4 py-2" style={{ border: "1px solid black" }}>
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