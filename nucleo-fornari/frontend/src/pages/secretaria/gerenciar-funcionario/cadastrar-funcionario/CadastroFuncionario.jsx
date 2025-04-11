import React from "react";
import BoxInputs from "../../../../components/box-inputs/boxInputs";
import HeaderBar from "../../../../components/header-bar/headerBar";
import { TextField } from "@mui/material";

const CadastroFuncionario = () => {

    return (
        <>
            <HeaderBar title="Cadastrar Funcionario" />

            <div className="flex flex-column justify-center mt-20">
                <BoxInputs title="Dados do Funcionario">
                    <TextField                    
                        slotProps={{ 
                            inputLabel: { shrink: true }
                        }}
                        id="outlined-basic"
                        label="Nome completo"
                        name="nomeCompleto"
                        variant="outlined"
                        type="text"
                        sx={{
                            width: "50%",
                            backgroundColor: "white"
                        }}
                    />

                    <TextField
                        slotProps={{ 
                            inputLabel: { shrink: true }
                        }}
                        id="outlined-basic"
                        label="Data de Nascimento"
                        name="dtNascimento"
                        type="date"
                        sx={{
                            width: "50%",
                            backgroundColor: "white"
                        }}
                        variant="outlined"
                    />

                </BoxInputs>
            </div>
        </>
    )
}

export default CadastroFuncionario;