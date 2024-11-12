import React from "react";
import Avisos from "../publicacoes/Avisos";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function Agenda(props) {
  const agenda = [
    {
      titulo: "Lição de Casa - Matemática",
      conteudo: "Resolver as páginas 10 a 12 do livro de matemática.",
      autor: "Profª Ana",
      dataCriacao: "Segunda-Feira, 3 de Novembro",
    },
    {
      titulo: "Trabalho de Ciências",
      conteudo: "Trazer uma maquete de vulcão até o dia 8 de Novembro.",
      autor: "Profª Marta",
      dataCriacao: "Terça-Feira, 4 de Novembro",
    },
    {
      titulo: "Prova de Português",
      conteudo:
        "Revisar os capítulos 1 e 2 para a prova na próxima sexta-feira.",
      autor: "Profª Carla",
      dataCriacao: "Quarta-Feira, 5 de Novembro",
    },
    {
      titulo: "Lanche Compartilhado",
      conteudo:
        "Cada aluno deve trazer um prato para compartilhar na sexta-feira.",
      autor: "Profª Renata",
      dataCriacao: "Quinta-Feira, 6 de Novembro",
    },
    {
      titulo: "Leitura de História",
      conteudo:
        "Ler o livro 'O Menino e o Balão Vermelho' para a roda de leitura.",
      autor: "Profª Júlia",
      dataCriacao: "Sexta-Feira, 7 de Novembro",
    },
    {
      titulo: "Atividade de Arte",
      conteudo:
        "Trazer tinta guache e pincel para a atividade de pintura na segunda-feira.",
      autor: "Profª Paula",
      dataCriacao: "Sexta-Feira, 7 de Novembro",
    },
    {
      titulo: "Passeio ao Zoológico",
      conteudo:
        "Levar autorização assinada e R$20 para o passeio do dia 12 de Novembro.",
      autor: "Profª Silvia",
      dataCriacao: "Segunda-Feira, 10 de Novembro",
    },
  ];

  const alunos = ["felipe", "caique"];

  const [aluno, setAluno] = React.useState(alunos[0]); // Define o estado inicial com o primeiro valor

  const handleChangeSelectAluno = (event) => {
    setAluno(event.target.value);
  };

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const mesAtualIndex = new Date().getMonth();
  // Define o estado inicial com o mês atual
  const [mes, setMes] = React.useState(meses[mesAtualIndex]);

  const handleChangeSelectMes = (event) => {
    setMes(event.target.value);
  };

  return (
    <>
      <div className="flex p-12 items-center justify-around">
        <div className="flex items-center">
          <h1>
            <b>Agenda de</b>
          </h1>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Aluno</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={aluno}
              label="Aluno"
              onChange={handleChangeSelectAluno}
            >
              {alunos.map((nome) => (
                <MenuItem key={nome} value={nome}>
                  {nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center">
          <h1>
            <b>Filtro:</b>
          </h1>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Mês</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={mes}
              label="Mês"
              onChange={handleChangeSelectMes}
            >
              {meses.map((nomeMes) => (
                <MenuItem key={nomeMes} value={nomeMes}>
                  {nomeMes}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Avisos avisosData={agenda}></Avisos>
    </>
  );
}

export default Agenda;
