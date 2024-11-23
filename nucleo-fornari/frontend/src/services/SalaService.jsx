import Api from "./api";

const ApiService = {
    getSalas: async function () {
        return await Api.get('/salas');
    },

    getSalaGrupos: async function () {
        return await Api.get('/salas/grupos');
    }
}

export default ApiService;