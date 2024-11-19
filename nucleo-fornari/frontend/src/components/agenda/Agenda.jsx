import React, { useState, useEffect } from "react";
import Avisos from "../publicar/Avisos";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import api from "../../services/api";

function Agenda() {
  const [afilhados, setAfilhados] = useState([]);
  const [aluno, setAluno] = useState(""); 
    const tipos = ["Observações Diárias", "Recados Gerais", "Publicações"];
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


  const avisosData = [
    {
        "titulo": "Observação sobre Alimentação",
        "conteudo": "Notamos que o Joãozinho não quis comer o lanche de hoje. Sugerimos trazer uma opção alternativa.",
        "autor": "Professora Viviane",
        "dataCriacao": "Terça-Feira, 3 de Setembro"
    },
    {
        "titulo": "Aviso sobre Atividade de Pintura",
        "conteudo": "Lembrar de enviar uma roupa extra para a atividade de pintura, que acontecerá no dia 25 de Setembro.",
        "autor": "Professor Carlos",
        "dataCriacao": "Quarta-Feira, 20 de Setembro"
    },
    {
        "titulo": "Desenvolvimento Social",
        "conteudo": "A Maria está interagindo muito bem com os colegas, mas ainda precisa de incentivo para compartilhar brinquedos.",
        "autor": "Professora Fernanda",
        "dataCriacao": "Segunda-Feira, 15 de Setembro"
    },
    {
        "titulo": "Lembrete de Reunião",
        "conteudo": "A reunião de pais será no dia 5 de Outubro, às 09:00, na sala de artes.",
        "autor": "Professora Juliana",
        "dataCriacao": "Sexta-Feira, 1 de Outubro"
    },
    {
        "titulo": "Sugestão de Livro para Leitura",
        "conteudo": "Recomendamos o livro 'O Pequeno Príncipe' para leitura com o Lucas em casa, visando estimular o interesse por histórias.",
        "autor": "Professor Rafael",
        "dataCriacao": "Segunda-Feira, 5 de Outubro"
    },
    {
        "titulo": "Informações sobre Evento",
        "conteudo": "Teremos uma feira de profissões no pátio central às 15:00 no dia 20 de Outubro, e os pais estão convidados a participar.",
        "autor": "Professora Luciana",
        "dataCriacao": "Quinta-Feira, 15 de Outubro"
    },
    {
        "titulo": "Atividade de Leitura em Sala",
        "conteudo": "A semana de leitura ocorrerá na biblioteca durante o horário de aula. Enviar um livro preferido do aluno.",
        "autor": "Professor Marcos",
        "dataCriacao": "Sexta-Feira, 20 de Outubro"
    }
];

const [data, setData] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const res = await api.get('/eventos/publicacoes');
                console.log(res.data)
                setData(res.data);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }
        };

        fetchEventos();
    }, []);

  return (
    <>
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
      <Avisos avisosData={data}/>
    </>
  );
}

export default Agenda;
