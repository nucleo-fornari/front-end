import Api from "./api";

const ApiService = {
    downloadFile: async (fileName) => {
        return await Api.get("/files/download/" + fileName);
    }
};

export default ApiService;