import React from 'react';
import './GerenciarFuncionario.css';
import { Link } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button } from "@mui/material";
import { CheckCircle as CheckIcon, Cancel as CloseIcon, Save as SaveIcon } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GerenciarFuncionario = () => {
    return (
        <div class='containner-gerencia-funcionarios'>
            <div class='containner-adicionar-funcionario'>
                <Link
                to={'/secretaria/cadastro/funcionario'}
                >                
                    <span class='redireciona-adicionar-funcionario'>
                    
                        + Novo Funcionario
                    
                    </span>
                </Link>
            </div>
            <Box sx={{ p: 5 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="order-label">Ordenar por:</InputLabel>
        <Select
          labelId="order-label"
          label="Ordenar por:"
          variant="outlined"
        >
          <MenuItem value={0}>Sala</MenuItem>
          <MenuItem value={1}>Funcionario</MenuItem>
          <MenuItem value={1}>Função</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sala</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Funcionario</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Funcão</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>              
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data.length > 0 ? (
              data.map((chamado) => ( */}
                <TableRow hover sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' } }}>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>G1A</Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>Elena</Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>Professora</Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ p: 1, borderRadius: 1 }}>professoraelena@gmail.com</Box>
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon style={{ color: 'blue' }}
                      // onClick={() => handleMudarChamado(chamado.id)}
                      // color={chamado.finalizado ? "success" : "error"}
                      aria-label="Concluir chamado"
                    >
                      {/* {chamado.finalizado ? <CheckIcon /> : <CloseIcon sx={{ color: 'red' }} />} */}
                    </EditIcon>
                    <DeleteIcon style={{ color: 'red' }} />
                  </TableCell>

                </TableRow>
            
            {/* : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, fontStyle: "italic" }}>
                  Nenhum Aluno cadastrado
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

        </div>
    );
};

export default GerenciarFuncionario;