import fotoEscola from '../../assets/imgs/fotoEscola.png'

function Escola() {

    return (

        <section id='escola' className="w-full flex items-center justify-evenly p-16 bg-blue-pastel max-lg:flex-col max-lg:gap-16">

            <section className='size-2/5 max-lg:w-80'>
                <h1 className='text-5xl py-6 text-blue-dark max-lg:text-8xl'>
                    A escola
                </h1>
                <p className='text-justify max-lg:text-2xl'>
                A Escola Municipal de Educação Infantil Darci Aparecida Fincatti Fornari, fundada em 1984, está localizada na Rua Elza Jorge, nº 153, no Jardim Esperança, em Mauá, São Paulo. Oferece ensino integral para crianças de 0 a 5 anos, com foco em educação e cuidado em um ambiente seguro e acolhedor.

Com professores capacitados e uma estrutura adequada às necessidades das primeiras fases de desenvolvimento infantil, a escola é reconhecida pela qualidade educacional e desenvolvimento integral dos alunos. A programação inclui atividades que estimulam aprendizado, criatividade, desenvolvimento social e motor, além de alimentação balanceada e espaços recreativos seguros. A escola apoia o desenvolvimento completo das crianças em parceria com as famílias e a comunidade
                </p>
            </section>

            <div className="w-500 h-400">
                <img className="rounded-3xl" src={fotoEscola} alt="Foto da escola" />
            </div>

        </section>

    )
}


export default Escola;