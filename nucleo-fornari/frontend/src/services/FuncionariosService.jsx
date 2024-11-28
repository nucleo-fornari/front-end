import Api from "./api";

const ApiService = {
    getFuncionarios: async () => {
        return await Api.get('/usuarios');
    },
    deleteFuncionario: async (id) => {
        return await Api.delete('/usuarios/' + id);
    }
};

export default ApiService;