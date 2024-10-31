function ProjetoColumn(props) {
    return (
        <section className="flex flex-col justify-evenly items-center text-white-main">
            <figure className="text-6xl">
                {props.image}
            </figure>
            <h3 className="py-3 font-semibold text-3xl">
                {props.title}
            </h3>
            <p className="w-60 text-center ">
                {props.text}
            </p>
        </section>


    )
}

export default ProjetoColumn;