import { useState } from "react";
import imgLogin from "../../assets/imgs/imgLogin.png";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"

const Formulario = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', senha: '' });

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrors({ email: '', senha: '' });

            try {
                const response = await api.post("usuarios/login", {
                    email: email,
                    senha: senha
                });

                if (response.status === 200) {
                    sessionStorage.TOKEN = response.data.token;
                    sessionStorage.FUNC = response.data.funcao;
                    sessionStorage.ID = response.data.userId;
                    sessionStorage.NOME = response.data.nome;
                    sessionStorage.SALAID = response.data.salaId;
                    if(response.data.funcao === "RESPONSAVEL") {
                        navigate("/responsavel");
                    } else if (response.data.funcao === "PROFESSOR") {
                        navigate("/professor");
                    } else if (response.data.funcao === "SECRETARIO") {
                        navigate("/secretaria");
                    } else {
                        console.log("Ocorreu algum erro ao coletar a função do usuário")
                    }

            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.errors) {
                // const fieldErrors = {};
                // error.response.data.errors.forEach((err) => {
                //     fieldErrors[err.field] = err.defaultMessage;
                // });
                // setErrors(fieldErrors);
                setErrors({
                    email: '',
                    senha: 'Email ou senha incorretos. Verifique os dados e tente novamente.',
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
            <div className="h-full w-full bg-blue-pastel flex items-center justify-center lg:flex md:hidden sm:hidden">
                <img src={imgLogin} className="h-3/5" alt="Login" />
            </div>

            <div className="bg-white-main h-full w-full flex justify-center items-center flex-col">
                <form onSubmit={handleLogin} className="rounded-2x1 w-3/5 gap-8 flex flex-col justify-center">
                    <h2 className="lg:text-5xl md:text-4xl text-blue-main">Entre com sua conta</h2>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        variant="outlined"
                        fullWidth={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        id="outlined-password"
                        label="Senha"
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // Alterna entre texto e senha
                        fullWidth={true}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        error={!!errors.senha}
                        helperText={errors.senha}
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
