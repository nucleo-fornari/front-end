import { useState } from "react";
import imgLogin from "../../assets/imgs/imgLogin.png";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../../api.js"

const Formulario = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post("usuarios/login", {
                email: email,
                senha: senha
            });

            if (response.status === 200) {
                alert('Login realizado com sucesso!');
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.errors) {
                error.response.data.errors.forEach((err) => {
                    console.error(`Erro no campo ${err.field}: ${err.defaultMessage}`);
                    alert(`Erro no campo ${err.field}: ${err.defaultMessage}`);
                });
            } else {
                console.error(error.message || 'Erro inesperado!');
                alert('Erro inesperado ao fazer login. Tente novamente.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <section className="flex h-screen w-screen">
            <div className="h-full w-full bg-blue-pastel flex items-center justify-center">
                <img src={imgLogin} className="h-3/5" alt="Login" />
            </div>

            <div className="bg-white-main h-full w-full flex justify-center items-center flex-col">
                <form onSubmit={handleLogin} className="rounded-2x1 w-3/5 gap-8 flex flex-col justify-center">
                    <h2 className="text-5xl text-blue-main">Entre com sua conta</h2>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        variant="outlined"
                        fullWidth={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-password"
                        label="Senha"
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // Alterna entre texto e senha
                        fullWidth={true}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <button type="submit" className="py-3 px-8 rounded bg-blue-main hover:bg-blue-pastel text-white-main smooth-">
                        Entrar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Formulario;
