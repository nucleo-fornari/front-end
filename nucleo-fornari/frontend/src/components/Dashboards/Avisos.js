function Avisos() {
    // Dados mockados
    const avisosData = [
        {
            titulo: "Encontro de Pais - 20/09",
            conteudo: "Sala G1A às 16:00",
            autor: "Viviane",
            dataCriacao: "Terça-Feira, 3 de Setembro"
        },
        {
            titulo: "Reunião Pedagógica - 25/09",
            conteudo: "Auditório Principal às 14:00",
            autor: "Carlos",
            dataCriacao: "Quarta-Feira, 20 de Setembro"
        },
        {
            titulo: "Festival de Ciências - 30/09",
            conteudo: "Ginásio às 10:00",
            autor: "Fernanda",
            dataCriacao: "Segunda-Feira, 15 de Setembro"
        },
        {
            titulo: "Aula Aberta de Artes - 05/10",
            conteudo: "Sala de Artes às 09:00",
            autor: "Juliana",
            dataCriacao: "Sexta-Feira, 1 de Outubro"
        },
        {
            titulo: "Palestra sobre Tecnologia - 10/10",
            conteudo: "Auditório às 13:00",
            autor: "Rafael",
            dataCriacao: "Segunda-Feira, 5 de Outubro"
        },
        {
            titulo: "Feira de Profissões - 20/10",
            conteudo: "Pátio Central às 15:00",
            autor: "Luciana",
            dataCriacao: "Quinta-Feira, 15 de Outubro"
        },
        {
            titulo: "Semana de Leitura - 25/10",
            conteudo: "Biblioteca durante o horário de aula",
            autor: "Marcos",
            dataCriacao: "Sexta-Feira, 20 de Outubro"
        }
    ];

    return (
        <section className="w-full flex items-center flex-col px-20 py-4 overflow-y-scroll h-90vh">
            {avisosData.map((aviso, index) => (
                <div key={index} className="bg-white-ice shadow-2xl p-10 mb-3 rounded-lg w-4/5 flex flex-col gap-2">
                    <h1 className="text-4xl font-semibold text-blue-main">{aviso.titulo}</h1>
                    <p className="text-2xl py-5 text-black-light">{aviso.conteudo}</p>
                    <h3 className="italic font-semibold text-black-light">Por {aviso.autor},</h3>
                    <p className="italic text-black-light">{aviso.dataCriacao}</p>
                </div>
            ))}
        </section>
    );
}

export default Avisos;
