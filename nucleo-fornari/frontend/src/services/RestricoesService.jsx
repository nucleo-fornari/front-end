import Api from "./api";

const ApiService = {
    getRestricoes: async function () {
        return await Api.get('/restricoes');
    },
};

export default ApiService;