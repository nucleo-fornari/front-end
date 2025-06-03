import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from 'dayjs-plugin-utc';
import HeaderBar from '../header-bar/headerBar';
import useApi from "../../hooks/ApiHook";
import ModalSolicitarReuniaoComponent from '../modal-solicitar-reuniao/ModalSolicitarReuniao';

function Reuniao() {
  dayjs.extend(utc);

  const api = useApi();

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [filhosComSala, setFilhosComSala] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const usuarioId = sessionStorage.ID;
    if (usuarioId) {
      api.get(`agendamento?usuarioId=${usuarioId}`)
        .then(response => {
          if (response.status === 204) {
            setRows([]);
          } else {
            setRows(response.data);
          }
        })
        .catch(error => {
          console.error("Erro ao buscar agendamentos:", error);
        });

      api.get(`/usuarios/aluno-e-sala/${usuarioId}`)
        .then((response) => {
          setFilhosComSala(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar filhos e salas:", error);
        });
    }
  }, [api]);

  return (
    <>
      <HeaderBar title={"Reunião"} />
      <div className="flex flex-col pr-12 pl-12 pb-12">
        <div className="w-full flex justify-end p-5">
          <Button variant="contained" onClick={handleOpen}>Solicitar Reunião</Button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow className="bg-blue-main">
                <TableCell sx={{ color: "white", fontSize: 20 }}>Motivo</TableCell>
                <TableCell sx={{ color: "white", fontSize: 20 }} align="center">Data</TableCell>
                <TableCell sx={{ color: "white", fontSize: 20 }} align="center">Aceito</TableCell>
                <TableCell sx={{ color: "white", fontSize: 20 }} align="center">Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!Array.isArray(rows) ? null : rows.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.motivo}</TableCell>
                  <TableCell align="center">
                    {dayjs(row.data).utc().local().format('DD-MM-YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell align="center">{row.aceito ? "Sim" : "Não"}</TableCell>
                  <TableCell align="center">{row.descricao}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>

        {Array.isArray(rows) && rows.length === 0 && (
          <div className='w-full flex justify-center mt-5 text-2xl'>
            Nenhuma reunião agendada
          </div>
        )}
      </div>

      {open && (
        <ModalSolicitarReuniaoComponent
          handleClose={handleClose}
          filhosComSala={filhosComSala}
          rows={rows}
          setRows={setRows}
        />
      )}
    </>
  );
}

export default Reuniao;