import Api from "./api";

const ApiService = {
    getAlunos: async function () {
        return await Api.get('/alunos');
    },

    deleteAluno: async function (id) {
        return await Api.delete('/alunos/' + id);
    },
};

export default ApiService;