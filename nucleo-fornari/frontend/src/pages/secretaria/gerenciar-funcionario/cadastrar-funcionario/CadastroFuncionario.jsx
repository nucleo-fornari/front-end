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
                        margin="normal"
                        id="outlined-basic"
                        label="Nome completo"
                        name="nomeCompleto"
                        variant="outlined"
                        type="text"
                        fullWidth={true}
                    />

                </BoxInputs>
            </div>
        </>
    )
}

export default CadastroFuncionario;