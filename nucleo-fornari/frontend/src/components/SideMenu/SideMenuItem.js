function SideMenuItem(props) {

    return (
        <nav className=" flex-grow flex justify-around items-center">

            <figure className="text-blue-dark">
                {props.icone}
            </figure>
            <button className="flex items-center w-full p-3 my-2 hover:bg-purple-pastel text-white">
                {/* <FaRegNewspaper className="text-2xl" /> */}
                <span className="ml-4 text-lg">{props.titulo}</span>
            </button>

        </nav>
    )
}



export default SideMenuItem;