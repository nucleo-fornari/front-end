import imgLogin from "../../assets/imgs/imgLogin.png"
import InputAdornments from "./InputText"
import { TextField } from "@mui/material"

const Formulario = () => {
    return (
        <>

            <section className="flex h-screen w-screen">
                <div className="h-full w-full bg-blue-pastel flex items-center justify-center">
                   <img src={imgLogin} className="h-3/5" /> 
                </div>
                

                <div className="bg-white-main h-full w-full flex justify-center items-center flex-col">
                    <div className="rounded-2x1 w-3/5 gap-8 flex flex-col justify-center">
                        <h2 className="text-5xl text-blue-main">Entrar</h2>
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} />
                        <InputAdornments />
                        <button className="py-3 px-8 rounded bg-blue-main hover:bg-blue-pastel text-white-main smooth-">Entrar</button>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Formulario