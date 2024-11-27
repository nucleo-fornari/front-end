import React, {useEffect, useState} from 'react';
import './GerenciarAluno.css';
import { Link } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlunoService from "../../../services/AlunosService";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";

const GerenciarAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [filteredAlunos, setFilteredAlunos] = useState([]);

  const handleSelectChange = (event) => {
    if (!event) {
      setFilteredAlunos(alunos);
      return;
    }
    setFilteredAlunos(alunos.filter(aluno => aluno.nome.toUpperCase().indexOf(event.toUpperCase()) !== -1));
  }

  const loadAlunos = () => {
    AlunoService.getAlunos().then((res) => {
      setAlunos(res.data);
    }).catch((error) => console.log(error));
  }

  const handleDelete = (id) => {
    AlunoService.deleteAluno(id).then((res) => {
        if (res.status === 204) {
            toast.success('Deletado com sucesso!');
            const aux = alunos.filter((aluno) => aluno.id !== id);
            setAlunos(aux);
        }
    }).catch((error) => {
      console.log(error);
      toast.error('Erro ao deletar!');
    })
  }

  useEffect(() => {
    loadAlunos();
  }, []);

  useEffect(() => {
    setFilteredAlunos(alunos);
  }, [alunos]);

  return (

    <div class='containner-gerencia-alunos'>
      <div class='containner-adicionar-aluno'>
        <Link
          to={'/secretaria/cadastro/aluno'}
        >
          <span class='redireciona-adicionar-aluno'>

            Novo Aluno

          </span>
        </Link>
      </div>
      <Box sx={{ p: 5 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
              label="Buscar por nome:"
              variant="outlined"
              onChange={(e) => handleSelectChange(e.target.value)}
              placeholder=""
          />
        </FormControl>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sala</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Aluno</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>RA</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Responsavel</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!filteredAlunos || !Array.isArray(filteredAlunos) ? null :
              filteredAlunos.map((aluno) => (
                  <TableRow hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                    <TableCell align="center">
                      <Box sx={{ p: 1, borderRadius: 1 }}>{aluno.sala ?? "Não atribuída"}</Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ p: 1, borderRadius: 1 }}>{aluno.nome}</Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ p: 1, borderRadius: 1 }}>{aluno.ra}</Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ p: 1, borderRadius: 1 }}>{aluno.filiacoes[0].responsavel.nome}</Box>
                    </TableCell>
                    <TableCell align="center">
                      <EditIcon style={{ color: 'blue' }}
                          // onClick={() => handleMudarChamado(chamado.id)}
                          // color={chamado.finalizado ? "success" : "error"}
                                aria-label="Concluir chamado"
                      >
                        {/* {chamado.finalizado ? <CheckIcon /> : <CloseIcon sx={{ color: 'red' }} />} */}
                      </EditIcon>
                      <DeleteIcon
                          style={{ color: 'red' }}
                          onClick={() => handleDelete(aluno.id)}
                      />
                    </TableCell>

                  </TableRow>))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    </div>
  );
};

export default GerenciarAluno;