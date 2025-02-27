import logoBranco from "../../assets/imgs/logoBranco.png"
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import dayjs from "dayjs";

function Footer(){
    const anoAtual = dayjs().year();
    return(
        <footer id='contato' className="p-16 bg-blue-dark text-white-main">
            <section className="flex justify-around">
            <img src={logoBranco} />
        
            <div className="w-60 flex flex-col gap-5 text-lg">
            <p><EmailRoundedIcon/> nucleofornari@gmail.com</p> 
            <p><FmdGoodRoundedIcon/> Rua Haddock Lobo, 595, Cerqueira César, São Paulo - SP, CEP: 01414-001</p> 
            </div>
            </section>
            
            <div className="flex justify-center pt-10">
                <p>© {anoAtual} Núcleo Fornari - Todos os direitos reservados.</p>
            </div>

        </footer>
    )
}

export default Footer;