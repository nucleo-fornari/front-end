import { Button } from "@mui/material";
import Calendar from "../calendario/Calendario";
import AlignItemsList from "../lista-alunos/ListaAlunos";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { useState } from "react";
import ModalChamado from "../modals/chamado/ModalChamado";
import ModalRecadoGeral from "../modals/recado-geral/ModalRecadoGeral";

export function Inicio() {
  const [openChamado, setOpenChamado] = useState(false);
  const [openRecadoGeral, setOpenRecadoGeral] = useState(false);

  const handleCloseRecado = () => {
    setOpenRecadoGeral(false);
  };
  const handleOpenRecado = () => {
    setOpenRecadoGeral(true);
  };

  const handleCloseChamado = () => {
    setOpenChamado(false);
  };
  const handleOpenChamado = () => {
    setOpenChamado(true);
  };

  return (
    <section className="flex lg:justify-evenly p-16 md:justify-center md:flex-col">
      <div className="text-white-main flex flex-col gap-20 ">
        <Calendar />
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
          onClick={handleOpenRecado}
        >
          Recado geral
        </Button>
      </div>

      <ModalChamado open={openChamado} handleClose={handleCloseChamado} />
      <ModalRecadoGeral
        open={openRecadoGeral}
        handleClose={handleCloseRecado}
      />
    </section>
  );
}
