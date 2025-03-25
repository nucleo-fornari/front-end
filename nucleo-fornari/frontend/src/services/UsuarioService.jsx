import Api from "./api";

const ApiService = {
    esqueciSenha: async (email) => {
        const data = new FormData();
        data.append('email', email);
        return await Api.patch("usuarios/esqueci-senha", data);
    },

    tokenRedefinicaoSenha: async (token) => {
        const data = new FormData();
        data.append('token', token);
        return await Api.patch("usuarios/token-redefinicao-senha", data);
    },

    redefinicaoSenha: async (email, senha, token) => {
        const data = new FormData();
        data.append('token', token);
        data.append('senha', senha);
        data.append('email', email);
        return await Api.put("usuarios/redefinir-senha", data)
    }
};

export default ApiService;