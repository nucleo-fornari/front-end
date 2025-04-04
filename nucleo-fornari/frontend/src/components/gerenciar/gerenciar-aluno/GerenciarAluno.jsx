import React, { useEffect, useState } from 'react';
import './GerenciarAluno.css';
import { Link } from 'react-router-dom';
import {
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlunoService from "../../../services/AlunosService";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ModalConfirm from '../../modals/confirmar-acao/ModalConfirm';
import HeaderBar from '../../header-bar/headerBar';
import ModalEditAluno from '../../modals/editar-personas/ModalEditAluno';
import ModalEdit from '../../modals/editar-personas/ModalEdit';

const GerenciarAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [aluno, setAluno] = useState({});
  const [selectedResponsavel, setSelectedResponsavel] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEditResponsavel = (responsavel) => {
    setSelectedResponsavel(responsavel);
    handleClose();
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedResponsavel({});
  };

  const handleCloseModal = () => setModalConfirmOpen(false);

  const handleOpenConfirmModal = (id) => {
    setId(id)
    setModalConfirmOpen(true);
  };

  const handleConfirmAction = () => {
    handleDelete();
    setModalConfirmOpen(false);
  };

  const handleEdit = (aluno) => {
    setAluno(aluno)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
    setAluno({});
  }

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

  const handleDelete = () => {
    AlunoService.deleteAluno(id).then((res) => {
      if (res.status === 204) {
        toast.success('Deletado com sucesso!');
        const aux = alunos.filter((aluno) => aluno.id !== id);
        setAlunos(aux);
      }
    }).catch((error) => {
      console.log(error);
      toast.error(error.response?.data?.message || error.text || 'Erro ao deletar!');
    })
  }

  const handleDownload = (fileName) => {
    const fileUrl = process.env.REACT_APP_API_URL + "/files/download/" + fileName;

    const link = document.createElement('a');
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    loadAlunos();
  }, []);

  useEffect(() => {
    setFilteredAlunos(alunos);
  }, [alunos]);

  return (
    <div>
      <HeaderBar title={"Gerenciar alunos"} />
      <div class='containner-gerencia-alunos'>

        <div class='containner-adicionar-aluno'>
          <Link
            to={'/secretaria/cadastro/aluno'}
          >
            <span class='redireciona-adicionar-aluno'>
              Novo Aluno
            </span>
          </Link>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Buscar por nome:"
              variant="outlined"
              onChange={(e) => handleSelectChange(e.target.value)}
              placeholder=""
            />
          </FormControl>
        </div>
        <Box sx={{ p: 5 }}>


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
                        <Box sx={{ p: 1, borderRadius: 1 }}>{aluno.sala ? aluno.sala.nome : "Não atribuída"}</Box>
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
                        {aluno.laudoNome ?
                          (<IconButton>
                            <InsertDriveFileIcon
                              onClick={() => handleDownload(aluno.laudoNome, aluno.nome)}
                              sx={{ color: 'green' }}
                            />
                          </IconButton>) : null
                        }
                        <EditIcon
                          onClick={() => handleEdit(aluno)}
                          style={{ color: 'blue', cursor: 'pointer', marginRight: 8 }}
                        />
                        <DeleteIcon
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleOpenConfirmModal(aluno.id)}
                        />
                      </TableCell>

                    </TableRow>))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ModalConfirm
          open={modalConfirmOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAction}
          title={`Deseja apagar o aluno?`}
          description={`O aluno será apagado, Após confirmar esta ação não poderá ser desfeita.`}
        />
      </div>
      <ModalEditAluno open={open} handleClose={handleClose} aluno={aluno} handleEditResponsavel={handleEditResponsavel} />
      <ModalEdit open={openEditModal} handleClose={handleCloseEditModal} usuario={selectedResponsavel} />
    </div>
  );
};

export default GerenciarAluno;
