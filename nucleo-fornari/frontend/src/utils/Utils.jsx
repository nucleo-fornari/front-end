import AvisosService from "../services/AvisosService";

const functions = {
     mapEventoToAviso: (eventos) => {
             return eventos && eventos.length > 0 ? eventos.map((x) => {
                 const obj = {...x, autor: x.responsavel.nome, deleteHandler: AvisosService.deleteEvento};
                 if (x.responsavel.id === parseInt(sessionStorage.ID)) obj.deletable = true;
                 return obj;
             }) : [];
    },

    mapRecadoToAviso: (recados) => {
         return recados && recados.length > 0 ? recados.map((x) => {
             const obj = {...x, autor: x.responsavel.nome, descricao: x.conteudo, deleteHandler: AvisosService.deleteRecado};
             if (x.responsavel.id === parseInt(sessionStorage.ID)) obj.deletable = true;
             return obj;
         }) : [];
    }
}

export default functions;