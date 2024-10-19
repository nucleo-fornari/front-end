function SideMenuItem(props) {

    return (
        <nav className=" flex-grow flex items-center gap-1 text-white-gray hover:bg-blue-pastel rounded transition-colors h-full w-full p-1">

            <figure>
                {props.icone}
            </figure>
            <button className="flex items-center w-full p-3 my-2 text-white">
                {/* <FaRegNewspaper className="text-2xl" /> */}
                <div className="text-lg text-white-gray">{props.titulo}</div>
            </button>

        </nav>
    )
}



export default SideMenuItem;