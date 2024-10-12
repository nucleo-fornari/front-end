import Button from "./Button";
import imgBanner from "../../assets/imgs/imgBanner.png"



function Banner () {
    return(
        <section className="items-center justify-center flex flex-col relative">
            
        <img src={imgBanner} alt="Professora com seus alunos estudando" className=""/>
        <div className="absolute flex items-center justify-center flex-col">
           <p className="text-white-main text-center font-bold text-6xl text-wrap p-20 leading-loose">
            Integração de tecnologia com educação de qualidade
            
        </p>
        <button className="text-blue-pastel bg-white-main font-semibold py-1 px-8 rounded-2xl justify-self-end relative">
            Explorar
        </button>
        </div>
        
        
        </section>
    )
}

export default Banner;