import Api from "./api";

const ApiService = {
    getDimensoesCadastradas: async function (userId, tipo) {
        return await Api.get(`/avaliacao/dimensao/${userId}/${tipo}`);
    },

    deleteDimensao: async function (id) {
        return await Api.delete('/avaliacao/dimensao/' + id);
    },

    createDimensao: async function (body) {
        return await Api.post('/avaliacao/dimensao', body);
    },

    createAvaliacao: async function (body) {
        return await Api.post('/avaliacao', body);
    },

    downloadPdf: async function (id) {
        return await Api.get('/avaliacao/pdf/' + id, { responseType: 'blob' });
    },

    deleteAvaliacao: async function (id) {
        return await Api.delete('/avaliacao/' + id);
    }
};

export default ApiService;