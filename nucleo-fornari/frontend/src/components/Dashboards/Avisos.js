function Avisos(props) {

    return (
        
        <section className="w-full flex items-center flex-col px-20 py-4">
            <div className="bg-blue-pastel p-10 mb-3 rounded-lg w-4/5 flex flex-col gap-2" >

                <h1 className="text-4xl font-semibold">{props.titulo}</h1>

                <p className="text-2xl py-5"> {props.conteudo} </p>

                <h3 className="italic font-semibold">Por {props.autor},</h3>
                <p className="italic">{props.dataCriacao}</p>

            </div>
        </section>
    )


}

export default Avisos;