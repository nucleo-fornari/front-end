import React, { useState, useEffect } from "react";
import BoxInputs from "../../../../../components/box-inputs/boxInputs";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const DadosDoFuncionario = ({ onFormChange, externalErrors }) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [thereIsError, setThereIsError] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    dtNasc: "",
    funcao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "Campo Obrigatório" }));
    }

    if (onFormChange) {
      onFormChange(updatedFormData);
    }
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");
    setIsValid(allFieldsFilled);
  }, [formData]);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setThereIsError(hasErrors);
  }, [errors]);

  useEffect(() => {
    if (externalErrors) {
      setErrors((prev) => ({ ...prev, ...externalErrors }));
    }
  }, [externalErrors]);

  return (
    <>
      <BoxInputs title="Dados do Funcionario" isValid={isValid} thereIsError={thereIsError}>
        <div className="flex flex-row justify-between gap-6">
          <TextField
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            label="Nome completo*"
            type="text"
            className="w-1/2"
            error={!!errors.nome}
            helperText={errors.nome}
          />

          <TextField
            name="dtNasc"
            value={formData.dtNasc}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            label="Data de Nascimento*"
            type="date"
            className="w-1/2"
            error={!!errors.dtNasc}
            helperText={errors.dtNasc}
          />
        </div>

        <div>
          <Box className="w-2/5">
            <FormControl fullWidth error={!!errors.funcao}>
              <InputLabel>Cargo*</InputLabel>
              <Select
                name="funcao"
                value={formData.funcao}
                onChange={handleChange}
                label="Cargo"
              >
                <MenuItem value="SECRETARIO">Secretaria</MenuItem>
                <MenuItem value="PROFESSOR">Professor</MenuItem>
              </Select>
              {errors.funcao && (
                <p className="text-red-500 text-sm mt-1">{errors.funcao}</p>
              )}
            </FormControl>
          </Box>
        </div>
      </BoxInputs>
    </>
  );
};

export default DadosDoFuncionario;