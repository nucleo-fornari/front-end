import { Outlet, useLocation } from "react-router-dom";
import imgLogin from "../../assets/imgs/imgLogin.png"
import recuperacaoEmail from "../../assets/imgs/recuperacaoEmail.png"
import codigoEmail from "../../assets/imgs/codigoEmail.png"
import NotFound from "../not-found/NotFound";

function Login() {

    const location = useLocation(); 

    const imagensPorRota = {
      "/login": imgLogin,
      "/login/": imgLogin,
      "/login/recuperacao-senha": recuperacaoEmail,
      "/login/recuperacao-senha/": recuperacaoEmail,
      "/login/recuperacao-senha/autenticacao": codigoEmail, 
      "/login/recuperacao-senha/autenticacao/": codigoEmail 
    };
  
    const imagem = imagensPorRota[location.pathname];

  return (
    <section className="flex h-screen w-screen">
      <div className="h-full w-full bg-blue-pastel flex items-center justify-center lg:flex md:hidden sm:hidden">
        <img src={imagem}
        className="h-3/5" alt="Login" />
      </div>

      <div className="bg-white-main h-full w-full flex justify-center items-center flex-col">
        
        <Outlet />
      </div>
    </section>
  );
}

export default Login;
