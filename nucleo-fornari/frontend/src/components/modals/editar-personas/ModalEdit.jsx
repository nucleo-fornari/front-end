import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, Grid } from "@mui/material";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ModalEdit = ({ open, handleClose, usuario }) => {
  const defaultFormData = {
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    dtNasc: "",
    funcao: "",
    endereco: {
      cep: "",
      uf: "",
      localidade: "",
      bairro: "",
      logradouro: "",
      complemento: "",
      numero: "",
    },
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (usuario) {
      setFormData({ ...defaultFormData, ...usuario, endereco: { ...defaultFormData.endereco, ...usuario.endereco } });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value },
    }));

    if (name === "cep") {
      let formattedValue = value.replace(/\D/g, "").slice(0, 8);
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}-${formattedValue.slice(5)}`;
      }
      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, cep: formattedValue },
      }));

      if (formattedValue.length === 9) {
        api.get(`enderecos?cep=${formattedValue}`)
          .then((response) => {
            const endereco = response.data;
            setFormData((prev) => ({
              ...prev,
              endereco: {
                ...prev.endereco,
                uf: endereco.uf,
                localidade: endereco.localidade,
                bairro: endereco.bairro,
                logradouro: endereco.logradouro,
              },
            }));
          })
          .catch((error) => {
            console.error("Erro ao buscar endereço:", error);
          });
      }
    }
  };

  const handleSave = () => {
    api.put("/usuarios/" + usuario.id, formData).then((response) => {
      toast.success("Dados do usuário atualizados!")
      handleClose();
    }).catch((error) => {
      toast.error(error.response?.data?.message || error.text || "Erro ao atualizar os dados do usuário");
    });
    handleClose();
  };

  return (
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
          Editar Usuário
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Nome" name="nome" value={formData.nome} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="CPF" name="cpf" value={formData.cpf} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
            <TextField fullWidth label="Data de Nascimento" name="dtNasc" type="date" InputLabelProps={{ shrink: true }} value={formData.dtNasc} onChange={handleChange} margin="normal" />
            <TextField disabled fullWidth label="Função" name="funcao" value={formData.funcao} onChange={handleChange} margin="normal" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="CEP" name="cep" value={formData.endereco.cep} onChange={handleEnderecoChange} margin="normal" />
            <TextField disabled fullWidth label="UF" name="uf" value={formData.endereco.uf} onChange={handleEnderecoChange} margin="normal" />
            <TextField disabled fullWidth label="Localidade" name="localidade" value={formData.endereco.localidade} onChange={handleEnderecoChange} margin="normal" />
            <TextField disabled fullWidth label="Bairro" name="bairro" value={formData.endereco.bairro} onChange={handleEnderecoChange} margin="normal" />
            <TextField disabled fullWidth label="Logradouro" name="logradouro" value={formData.endereco.logradouro} onChange={handleEnderecoChange} margin="normal" />
            <TextField fullWidth label="Complemento" name="complemento" value={formData.endereco.complemento} onChange={handleEnderecoChange} margin="normal" />
            <TextField fullWidth label="Número" name="numero" value={formData.endereco.numero} onChange={handleEnderecoChange} margin="normal" />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
