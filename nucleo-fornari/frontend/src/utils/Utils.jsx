
const functions = {
     mapEventoToAviso: (eventos) => {
             return eventos && eventos.length > 0 ? eventos.map((x) => {
                 const obj = {...x, autor: x.responsavel.nome};
                 if (x.responsavel.id == sessionStorage.ID) obj.deletable = true;
                 return obj;
             }) : [];
    }
}

export default functions;