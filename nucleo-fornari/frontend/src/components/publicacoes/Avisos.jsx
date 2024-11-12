function Avisos({avisosData}) {

    // const avisosData = [
    //     {
    //         "titulo": "Observação sobre Alimentação",
    //         "conteudo": "Notamos que o Joãozinho não quis comer o lanche de hoje. Sugerimos trazer uma opção alternativa.",
    //         "autor": "Professora Viviane",
    //         "dataCriacao": "Terça-Feira, 3 de Setembro"
    //     },
    //     {
    //         "titulo": "Aviso sobre Atividade de Pintura",
    //         "conteudo": "Lembrar de enviar uma roupa extra para a atividade de pintura, que acontecerá no dia 25 de Setembro.",
    //         "autor": "Professor Carlos",
    //         "dataCriacao": "Quarta-Feira, 20 de Setembro"
    //     },
    //     {
    //         "titulo": "Desenvolvimento Social",
    //         "conteudo": "A Maria está interagindo muito bem com os colegas, mas ainda precisa de incentivo para compartilhar brinquedos.",
    //         "autor": "Professora Fernanda",
    //         "dataCriacao": "Segunda-Feira, 15 de Setembro"
    //     },
    //     {
    //         "titulo": "Lembrete de Reunião",
    //         "conteudo": "A reunião de pais será no dia 5 de Outubro, às 09:00, na sala de artes.",
    //         "autor": "Professora Juliana",
    //         "dataCriacao": "Sexta-Feira, 1 de Outubro"
    //     },
    //     {
    //         "titulo": "Sugestão de Livro para Leitura",
    //         "conteudo": "Recomendamos o livro 'O Pequeno Príncipe' para leitura com o Lucas em casa, visando estimular o interesse por histórias.",
    //         "autor": "Professor Rafael",
    //         "dataCriacao": "Segunda-Feira, 5 de Outubro"
    //     },
    //     {
    //         "titulo": "Informações sobre Evento",
    //         "conteudo": "Teremos uma feira de profissões no pátio central às 15:00 no dia 20 de Outubro, e os pais estão convidados a participar.",
    //         "autor": "Professora Luciana",
    //         "dataCriacao": "Quinta-Feira, 15 de Outubro"
    //     },
    //     {
    //         "titulo": "Atividade de Leitura em Sala",
    //         "conteudo": "A semana de leitura ocorrerá na biblioteca durante o horário de aula. Enviar um livro preferido do aluno.",
    //         "autor": "Professor Marcos",
    //         "dataCriacao": "Sexta-Feira, 20 de Outubro"
    //     }
    // ] // dados mockados de aluno

    return (
        <section className="w-full flex items-center flex-col px-20 py-4 overflow-y-scroll h-77vh">
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
