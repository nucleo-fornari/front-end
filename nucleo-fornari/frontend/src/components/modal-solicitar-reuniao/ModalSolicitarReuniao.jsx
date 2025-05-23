import React from "react";
import "./ModalSolicitarReuniao.css"
import ModalOverlayComponent from "../modal-overlay/ModalOverlay";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ModalSolicitarReuniaoComponent = () => {
    return (
        <ModalOverlayComponent>
            <div class="containner-form">
                <div className="flex flex-col justify-center items-center">
                  <label className="text-3xl mt-5">Motivo da Solicitação</label>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="motivo-label">Motivo</InputLabel>
                    <Select
                      labelId="motivo-label"
                      id="motivo"
                      name="motivo"
                    >
                      <MenuItem value="administrativo">Administrativo</MenuItem>
                      <MenuItem value="documentacao">Documentação</MenuItem>
                      <MenuItem value="denuncia">Denúncia</MenuItem>
                    </Select>
                  </FormControl>
                </div>
            </div>
        </ModalOverlayComponent>
    )
}

export default ModalSolicitarReuniaoComponent;