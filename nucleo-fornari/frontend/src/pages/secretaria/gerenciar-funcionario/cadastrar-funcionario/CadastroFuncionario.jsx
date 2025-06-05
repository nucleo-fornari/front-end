import React, { useEffect, useState } from "react";
import HeaderBar from "../../../../components/header-bar/headerBar";
import DadosDoFuncionario from "./dados-do-funcionario-inputs/DadosDoFuncionario";
import InformacoesAdicionaisFuncionario from "./informacoes-adicionais-funcionario/InformacoesAdicionaisFuncionario";
import Endereco from "./endereco-funcionario/EnderecoFuncionario";
import useApi from "../../../../hooks/ApiHook"; // Certifique-se de que o caminho está correto
import { toast } from "react-toastify";

const CadastroFuncionario = () => {
  
  const api = useApi();

  const [dadosFuncionario, setDadosFuncionario] = useState({
    nome: "",
    dtNasc: "",
    funcao: "",
  });
  const [informacoesAdicionais, setInformacoesAdicionais] = useState({
    email: "",
    cpf: "",
    telefone: "",
  });
  const [enderecoFuncionario, setEnderecoFuncionario] = useState({
    cep: "",
    cidade: "",
    uf: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
  });
  const [dadosFuncionarioErrors, setDadosFuncionarioErrors] = useState({});
  const [informacoesAdicionaisErrors, setInformacoesAdicionaisErrors] = useState({});
  const [enderecoErrors, setEnderecoErrors] = useState({});

  const handleDadosFuncionarioChange = (dados) => {
    setDadosFuncionario(dados);
  };

  const handleInformacoesAdicionaisChange = (dados) => {
    setInformacoesAdicionais(dados);
  };

  const handleEnderecoFuncionarioChange = (dados) => {
    setEnderecoFuncionario(dados);
  };
  
  useEffect(() => {
    const cep = enderecoFuncionario.cep;
    if (cep.length === 9 && enderecoFuncionario.cidade === "") {
      api.get(`enderecos?cep=${cep}`)
        .then((response) => {
          const endereco = response.data;
          const updatedEnderecoData = {
            ...enderecoFuncionario,
            cidade: endereco.localidade,
            uf: endereco.uf,
            bairro: endereco.bairro,
            logradouro: endereco.logradouro,
          };
          setEnderecoFuncionario(updatedEnderecoData);
        })
        .catch((error) => {
          console.error("Erro ao buscar endereço:", error);
        });
    }
  }, [enderecoFuncionario, api]);

  const checkRequiredInputs = () => {
    const requiredFieldsFuncionario = ["nome", "dtNasc", "funcao"];
    const requiredFieldsAdicionais = ["email", "cpf", "telefone"];
    const requiredFieldsEndereco = ["cep"];
    const newErrorsFuncionario = {};
    const newErrorsAdicionais = {};
    const newErrorsEndereco = {};

    requiredFieldsFuncionario.forEach((field) => {
      if (!dadosFuncionario[field] || dadosFuncionario[field].trim() === "") {
        newErrorsFuncionario[field] = "Campo Obrigatório";
      }
    });

    requiredFieldsAdicionais.forEach((field) => {
      if (!informacoesAdicionais[field] || informacoesAdicionais[field].trim() === "") {
        newErrorsAdicionais[field] = "Campo Obrigatório";
      }
    });

    requiredFieldsEndereco.forEach((field) => {
      if (!enderecoFuncionario[field] || enderecoFuncionario[field].trim() === "") {
        newErrorsEndereco[field] = "Campo Obrigatório";
      }
    });

    if (
      Object.keys(newErrorsFuncionario).length > 0 ||
      Object.keys(newErrorsAdicionais).length > 0 ||
      Object.keys(newErrorsEndereco).length > 0
    ) {
      setDadosFuncionarioErrors(newErrorsFuncionario);
      setInformacoesAdicionaisErrors(newErrorsAdicionais);
      setEnderecoErrors(newErrorsEndereco);
      toast.error("Preencha os campos corretamente");
      return false;
    }

    setDadosFuncionarioErrors({});
    setInformacoesAdicionaisErrors({});
    return true;
  };

  const handleSubmit = () => {

    if (!checkRequiredInputs()) {
      return;
    }

    const obj = {
      id: null,
      ...dadosFuncionario,
      ...informacoesAdicionais,
      endereco: {
        id: null,
        ...enderecoFuncionario
      }
      
    };

    api.post("/usuarios/funcionario", obj)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Funcionário cadastrado com sucesso!");
          setDadosFuncionario({});
          setInformacoesAdicionais({});
          setEnderecoFuncionario({});
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Erro ao cadastrar funcionário."
        );
      });
  };

  return (
    <>
      <HeaderBar title="Cadastrar Funcionario" />

      <div className="flex flex-col items-center gap-6 justify-center mt-20 mb-20">
        <DadosDoFuncionario 
          onFormChange={handleDadosFuncionarioChange}
          externalErrors={dadosFuncionarioErrors}
        />

        <InformacoesAdicionaisFuncionario 
          onFormChange={handleInformacoesAdicionaisChange}
          externalErrors={informacoesAdicionaisErrors}
        />

        <Endereco
          onFormChange={handleEnderecoFuncionarioChange} 
          externalErrors={enderecoErrors} 
        />
      </div>

      {/* Botão para enviar os dados */}
      <div className="flex  justify-center mt-5">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Cadastrar Funcionário
        </button>
      </div>

      {/* Exibe os dados do formulário para depuração */}
      <pre>
        {JSON.stringify(
          {
            ...dadosFuncionario,
            ...informacoesAdicionais,
            ...enderecoFuncionario,
          },
          null,
          2
        )}
      </pre>
    </>
  );
};

export default CadastroFuncionario;
