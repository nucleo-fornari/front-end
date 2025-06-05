import React, { useEffect, useState } from "react";
import BoxInputs from "../../../../../components/box-inputs/boxInputs";
import { TextField } from "@mui/material";

const InformacoesAdicionaisFuncionario = ({ onFormChange, externalErrors }) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [thereIsError, setThereIsError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
    telefone: "",
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
      <BoxInputs title="Informações Adicionais" isValid={isValid} thereIsError={thereIsError}>
        <div className="flex flex-row justify-between gap-6">
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            label="Email*"
            className="w-1/2"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            label="CPF*"
            type="text"
            className="w-1/2"
            error={!!errors.cpf}
            helperText={errors.cpf}
          />
        </div>
        <div className="flex flex-row justify-between gap-6">
          <TextField
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            label="Telefone*"
            type="text"
            placeholder="(11)99999-9999"
            className="w-2/5"
            error={!!errors.telefone}
            helperText={errors.telefone}
          />
        </div>
      </BoxInputs>
    </>
  );
};

export default InformacoesAdicionaisFuncionario;
