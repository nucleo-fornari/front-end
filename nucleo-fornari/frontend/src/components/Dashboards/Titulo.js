import { render } from "@testing-library/react";

function Titulo(props){

    return(

        <div className="flex justify-center p-6">
        <h1 className="flex text-4xl ">{props.titulo}</h1>
        </div>
    )


}

export default Titulo;