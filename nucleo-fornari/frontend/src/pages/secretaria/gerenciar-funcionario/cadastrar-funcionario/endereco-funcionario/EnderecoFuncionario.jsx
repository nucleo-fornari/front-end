import { useEffect, useState } from "react";
import BoxInputs from "../../../../../components/box-inputs/boxInputs";
import { TextField } from "@mui/material";
import useApi from "../../../../../hooks/ApiHook"; 

const EnderecoFuncionario = ({ onFormChange, externalErrors }) => {
  const api = useApi();

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [thereIsError, setThereIsError] = useState(false);

  const [formData, setFormData] = useState({
    cep: "",
    cidade: "",
    uf: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {...formData, [name]: value};

    if (name === "cep") {
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}-${formattedValue.slice(5)}`;
      }

      const updatedCepData = {...formData, [name]: formattedValue };
      setFormData(updatedCepData);      

      if (value.trim() !== "") {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "Campo Obrigatório" }));
      }

      if (onFormChange) {
        onFormChange(updatedFormData);
      }

      if (formattedValue.length === 9) {
        api.get(`enderecos?cep=${formattedValue}`)
          .then((response) => {
            const endereco = response.data;
            const updatedEnderecoData = {
              ...formData,
              cep: formattedValue,
              cidade: endereco.localidade || "",
              uf: endereco.uf || "",
              bairro: endereco.bairro || "",
              logradouro: endereco.logradouro || "",
            };
            setFormData(updatedEnderecoData);
            if (onFormChange) {
              onFormChange(updatedEnderecoData); // Envia os dados completos para o pai
            }
          })
          .catch((error) => {
            console.error("Erro ao buscar endereço:", error);
          });
      }
      return;
    }
    
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
      <BoxInputs title="Endereço" isValid={isValid} thereIsError={thereIsError}>
        <TextField
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          slotProps={{
            inputLabel: { shrink: true },
            input: { maxLength: 9 },
          }}
          label="CEP*"
          type="text"
          className="w-2/5"
          error={!!errors.cep}
          helperText={errors.cep}
        />
        <div className="flex gap-4 justify-between items-center">
          <TextField
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            disabled
            label="Cidade"
            type="text"
            className="w-2/5"
          />
          <TextField
            name="uf"
            value={formData.uf}
            onChange={handleChange}
            disabled
            label="UF"
            type="text"
            className="w-1/5"
          />
          <TextField
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            disabled
            label="Bairro"
            type="text"
            className="w-1/3"
          />
        </div>

        <div className="flex gap-4 justify-start items-center">
          <TextField
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
            disabled
            label="Logradouro"
            type="text"
            className="w-1/2"
          />
          <TextField
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            label="Número"
            type="text"
            className="w-1/6"
          />
        </div>

        <TextField
          name="complemento"
          value={formData.complemento}
          onChange={handleChange}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          label="Complemento"
          type="text"
          className="w-full"
        />
      </BoxInputs>
    </>
  );
};

export default EnderecoFuncionario;
