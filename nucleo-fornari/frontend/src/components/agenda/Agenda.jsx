import React, { useState, useEffect } from "react";
import Avisos from "../publicar/Avisos";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import api from "../../services/api";
import Utils from "../../utils/Utils";
import HeaderBar from "../header-bar/headerBar";

function Agenda() {
  const [afilhados, setAfilhados] = useState([]);
  const [aluno, setAluno] = useState(""); 
  const tipos = ["Secretaria", "Professora"];
  const [tipo, setTipo] = useState(tipos[0]); // Estado para o tipo selecionado


  useEffect(() => {
    const fetchAfilhados = async () => {
      try {
        const userId = parseInt(sessionStorage.getItem("ID"), 10);
        const { data } = await api.get(`usuarios/${userId}`);
        const fetchedAfilhados = data.afiliados || [];
        setAfilhados(fetchedAfilhados);

        // Define o primeiro afilhado como selecionado (se existir)
        if (fetchedAfilhados.length > 0) {
          setAluno(fetchedAfilhados[0].nome);
        }
      } catch (error) {
        console.error("Erro ao buscar afilhados:", error);
      }
    };

    fetchAfilhados();
  }, []);

  const handleChangeSelectAluno = (event) => setAluno(event.target.value);
  const handleChangeSelectTipo = (event) => setTipo(event.target.value);

const [data, setData] = useState([]);

useEffect(() => {
  const fetchEventos = async () => {
    try {
      const afilhadoSelecionado = afilhados.find((afilhado) => afilhado.nome === aluno);
      if (afilhadoSelecionado) {
        let eventos = [];
        if (tipo === "Secretaria") {
          const res = await api.get(`eventos/sala/${afilhadoSelecionado.sala.id}`);
          eventos = Utils.mapEventoToAviso(res.data.filter((evento) => evento.tipo === "PUBLICACAO"));
        } else if (tipo === "Professora") {
          const [eventosRes, recadosRes] = await Promise.all([
            api.get(`eventos/sala/${afilhadoSelecionado.sala.id}`),
            api.get(`recados/aluno/${afilhadoSelecionado.id}`)
          ]);
          const avisosGerais = eventosRes.data.filter((evento) => evento.tipo === "AVISO_GERAL");
          eventos = [...Utils.mapEventoToAviso(avisosGerais), ...Utils.mapRecadoToAviso(recadosRes.data)];
        }
        setData(eventos);
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };
  
  setData([]);
  fetchEventos();
}, [aluno, afilhados, tipo]);



  return (
    <>
    <HeaderBar title={"Agenda do aluno"}/>
      <div className="flex p-12 items-center justify-around">
        {/* Seleção de Aluno */}
        <div className="flex items-center">
          <h1>
            <b>Agenda de</b>
          </h1>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-aluno-label">Aluno</InputLabel>
            <Select
              labelId="select-aluno-label"
              id="select-aluno"
              value={aluno}
              label="Aluno"
              onChange={handleChangeSelectAluno}
            >
              {afilhados.length > 0 ? (
                afilhados.map((afilhado) => (
                  <MenuItem key={afilhado.id} value={afilhado.nome}>
                    {afilhado.nome}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nenhum afilhado encontrado</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        {/* Filtro por Tipo */}
        <div className="flex items-center">
          <h1>
            <b>Filtro:</b>
          </h1>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-tipo-label">Tipo</InputLabel>
            <Select
              labelId="select-tipo-label"
              id="select-tipo"
              value={tipo}
              label="Tipo"
              onChange={handleChangeSelectTipo}
            >
              {tipos.map((nomeTipo) => (
                <MenuItem key={nomeTipo} value={nomeTipo}>
                  {nomeTipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Componente de Avisos */}
      <Avisos data={data}/>
    </>
  );
}

export default Agenda;
