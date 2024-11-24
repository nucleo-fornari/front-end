import Button from "./Button";
import { Link } from 'react-router-dom';


function Header({ logoAzul }) {

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-white-cinzabg w-full h-20 text-lg">
            <ul className="flex justify-evenly items-center text-blue-main font-normal flex-wrap">
                <li>
                    <Link to={"/"}>
                        <img src={logoAzul} alt="logotipo núcleo fornari azul" className="justify-self-start h-67 w-100" />
                    </Link>
                </li>
                <li onClick={() => scrollToSection('projeto')}>O projeto</li>
                <li onClick={() => scrollToSection('escola')}>A escola</li>
                <li onClick={() => scrollToSection('contato')}>Contato</li>
                <li>
                    <Link to={'/login'}>
                        <Button text="Login" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;