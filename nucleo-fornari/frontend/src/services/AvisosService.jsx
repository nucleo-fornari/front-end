import Api from "./api";

const ApiService = {
    getAvisos: async function () {
        return await Api.get('/eventos/publicacoes');
    },

    getRecadosByResponsavelId: async function (id) {
        return await Api.get('/recados/responsavel/' + id)
    },

    deleteRecado: async function (id) {
        return await Api.delete('/recados/' + id);
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
    },

    createRecado: async function (recado, alunoId) {
        return await Api.put('/recados/create/aluno/' + alunoId, recado);
    },

    updatePublicacao: async function (eventoId, evento) {
        return await Api.put('/eventos/' + eventoId, evento);
    },
};

export default ApiService;