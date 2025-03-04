import { Button } from "@mui/material";
import Calendar from "../calendario/FetchData.jsx";
import AlignItemsList from "../lista-alunos/ListaAlunos";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { useState } from "react";
import ModalChamado from "../modals/chamado/ModalChamado";
import ModalRecadoGeral from "../modals/recado-geral/ModalRecadoGeral";
import api from "../../services/api.js";
import HeaderBar from "../header-bar/headerBar.jsx";

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

  const handleRelatorio = async () => {
    try {
      const idSala = sessionStorage.getItem("ID_SALA");
  
      if (!idSala) {
        throw new Error("ID_SALA não encontrado no sessionStorage.");
      }
  
      const { data: sala } = await api.get(`/salas/${idSala}`);
  
      await api.post("/files/generate", sala);
  
      const response = await api.get(`/files/download/pessoas-autorizadas-${sala.nome}.csv`, {
        responseType: "blob",
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `pessoas-autorizadas-${sala.nome}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao gerar ou baixar o relatório:", error);
    }
  };
  

  return (
    <>
      <HeaderBar title={"Calendario de eventos"}/>
      <section className="flex lg:justify-evenly p-16 md:justify-center md:flex-col lg:flex-row">
        
        <div className="text-white-main flex flex-col gap-20 w-3/4 max-lg:w-full">
          <div className="h-[500px]">
          <Calendar />
        </div>
        <div className="lg:h-11 md:text-4xl">
          <Button
            className="lg:h-11 md:h-14 sm:h-16"
            variant="contained"
            // startIcon={<SupportAgentRoundedIcon />}
            color="primary"
            fullWidth={true}
            size="large"
            onClick={handleOpenChamado}
          >
            Abrir chamado
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <AlignItemsList />
        <Button
        className="lg:h-11 md:h-14 sm:h-16"
          variant="contained"
          size="large"
          fullWidth={true}
          onClick={handleOpenRecado}
        >
          Recado geral
        </Button>

        <Button
        className="lg:h-11 md:h-14 sm:h-16"
          variant="outlined"
          size="large"
          fullWidth={true}
          onClick={handleRelatorio}
        >
          Pessoas Autorizadas
        </Button>
      </div>

      <ModalChamado open={openChamado} handleClose={handleCloseChamado} />
      <ModalRecadoGeral
        open={openRecadoGeral}
        handleClose={handleCloseRecado}
      />
    </section>
    </>
    
  );
}
