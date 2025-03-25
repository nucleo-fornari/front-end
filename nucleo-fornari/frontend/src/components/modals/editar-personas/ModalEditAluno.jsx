import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"
import api from "../../../services/api";
import { toast } from "react-toastify";
import ModalConfirm from "../confirmar-acao/ModalConfirm";
import { Link } from 'react-router-dom'

const ModalEditAluno = ({ open, handleClose, aluno, handleEditResponsavel }) => {
  const [formData, setFormData] = useState({ id: 0, nome: "", ra: "", dtNasc: "" });
  const [responsaveis, setResponsaveis] = useState([]);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (aluno) {
      setFormData({
        id: aluno.id || 0,
        nome: aluno.nome || "",
        ra: aluno.ra || "",
        dtNasc: aluno.dtNasc || "",
      });
      setResponsaveis(
        aluno.filiacoes || []
      );
    }
  }, [aluno]);

  const handleOpenConfirmModal = (id) => {
    setId(id)
    setModalConfirmOpen(true);
  };

  const handleCloseModal = () => setModalConfirmOpen(false);

  const handleConfirmAction = () => {
    handleDelete();
    setModalConfirmOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    api.delete(`/alunos/${formData.id}/responsavel/${id}`).then((response) => {
      toast.success("Responsável removido com sucesso!");
    }).catch((error) => {
      console.log(error)
      toast.error(error.response?.data?.message || error.text || "Erro ao deletar o responsável");
    });
  };

  const handleSave = () => {
    api.put("/alunos", formData).then((response) => {
      toast.success("Dados do aluno atualizados!")
      handleClose();
    }).catch((error) => {
      toast.error(error.response?.data?.message || error.text || "Erro ao atualizar os dados do aluno");
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Editar Aluno
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Nome completo"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="RA"
            name="ra"
            value={formData.ra}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Data de nascimento"
            name="dtNasc"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dtNasc}
            onChange={handleChange}
          />
          <Typography variant="subtitle1" mt={2}>
            Responsáveis
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Parentesco</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responsaveis.map((resp, index) => (
                  <TableRow key={index}>
                    <TableCell>{resp.responsavel.nome}</TableCell>
                    <TableCell>{resp.responsavel.cpf}</TableCell>
                    <TableCell>{resp.parentesco}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEditResponsavel(resp.responsavel)}>
                        <Edit fontSize="small" style={{ color: 'blue' }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleOpenConfirmModal(resp.responsavel.id)}>
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Link to={`/secretaria/cadastro/responsavel/${aluno.id}`}>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Adicionar Responsável
            </Button>
          </Link>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal >

      <ModalConfirm
        open={modalConfirmOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        title={`Deseja apagar o responsável?`}
        description={`O responsável será apagado permanentemente, Após confirmar esta ação não poderá ser desfeita.`}
      />
    </>
  );
};

export default ModalEditAluno;
