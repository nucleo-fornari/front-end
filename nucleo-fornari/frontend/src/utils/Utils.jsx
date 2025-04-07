const functions = {
     mapEventoToAviso: (eventos, api) => {
             return eventos && eventos.length > 0 ? eventos.map((x) => {
                 const obj = {...x, autor: x.responsavel.nome, deleteHandler: async (id) => {
                         return await api.delete('/eventos/' + id);
                     }};
                 if (x.responsavel.id === parseInt(sessionStorage.ID)) obj.userIsOwner = true;
                 return obj;
             }) : [];
    },

    mapRecadoToAviso: (recados, api) => {
         return recados && recados.length > 0 ? recados.map((x) => {
             const obj = {...x, autor: x.responsavel.nome, descricao: x.conteudo, deleteHandler: async (id) => {
                     return await api.delete('/recados/' + id);
                 }};
             if (x.responsavel.id === parseInt(sessionStorage.ID)) obj.userIsOwner = true;
             return obj;
         }) : [];
    }
}

export default functions;