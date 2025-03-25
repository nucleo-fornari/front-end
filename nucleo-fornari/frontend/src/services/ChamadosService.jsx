import Api from "./api";

const ApiService = {
    getChamadosTipo: async function() {
        return await Api.get('/tipos-chamado');
    },

    postChamadoTipo: async function(body) {
        return await Api.post('/tipos-chamado', body);
    },

    deleteChamadoTipo: async function(id) {
        return await Api.delete('tipos-chamado/' + id)
    }
};

export default ApiService;