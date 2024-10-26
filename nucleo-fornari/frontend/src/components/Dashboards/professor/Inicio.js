import { Button } from "@mui/material";
import Agenda from "../Agenda";
import AlignItemsList from "./ListaLateral";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { useState } from "react";
import ModalChamado from "./ModalChamado";

export function Inicio() {
  const [openChamado, setOpenChamado] = useState(false);
  // const [openRecado, setRecado] = useState(false);

  const handleCloseChamado = () => {
    setOpenChamado(false);
  };
  const handleOpenChamado = () => {
    setOpenChamado(true);
  };


  return (
    <section className="flex justify-evenly p-16">

      <div className="text-white-main flex flex-col gap-20 ">
        <Agenda />
        <Button
          variant="contained"
          startIcon={<SupportAgentRoundedIcon />}
          color="primary"
          size="large"
          onClick={handleOpenChamado}
        >
          Abrir chamado
        </Button>
      </div>

      <div className="flex flex-col gap-12">
        <AlignItemsList />
        <Button
          variant="contained"
          size="medium"
          fullWidth={true}
        >Recado geral</Button>
      </div>

      <ModalChamado open={openChamado} handleClose={handleCloseChamado}/>

    </section>
  )
}