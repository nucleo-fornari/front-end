import Api from "./api";

const ApiService = {
    getAvisos: async function () {
        return await Api.get('/eventos/publicacoes');
    },
    getPublicacaoById: async function (id) {
        return await Api.get('/eventos/publicacoes/usuario/' + id);
    },
    createPublicacao: async function (publicacao) {
        publicacao.tipo = "PUBLICACAO";
        return await Api.post('/eventos', publicacao);
    },

    deleteEvento: async function (id) {
        return await Api.delete('/eventos/' + id);
    }
};

export default ApiService;