import fotoEscola from '../../assets/imgs/fotoEscola.png'

function Escola() {

    return (

        <section className="w-full flex items-center justify-evenly p-16 bg-blue-pastel">

            <section className='size-2/5'>
                <h1 className='text-5xl py-6 text-blue-dark'>
                    A escola
                </h1>
                <p className='text-justify'>
                A Escola Municipal de Educação Infantil Darci Aparecida Fincatti Fornari foi fundada em 1984 e está localizada na Rua Elza Jorge, número 153, no bairro Jardim Esperança, em Mauá, São Paulo. A escola oferece ensino em período integral, focando no atendimento de crianças de 0 a 5 anos de idade, contemplando tanto a educação quanto o cuidado diário desses alunos em um ambiente acolhedor e seguro.

Com um quadro de professores capacitados e uma estrutura física projetada para atender as necessidades de crianças em suas primeiras fases de desenvolvimento, a escola se destaca na comunidade pelo compromisso com a educação de qualidade e o desenvolvimento integral dos pequenos. A programação educacional é cuidadosamente planejada, incluindo atividades que estimulam o aprendizado, a criatividade, o desenvolvimento social e motor, e o bem-estar das crianças, considerando suas necessidades específicas em cada faixa etária.

Além do ambiente educativo, a escola oferece alimentação balanceada e adequada à faixa etária, reforçando a importância de hábitos alimentares saudáveis. A infraestrutura também conta com espaços recreativos seguros e apropriados, salas de aula equipadas, e áreas de descanso, garantindo que cada criança tenha suporte tanto para o aprendizado quanto para suas necessidades de cuidado diário. A Escola Darci Aparecida Fincatti Fornari se compromete, assim, a apoiar o desenvolvimento de cada aluno de maneira completa, trabalhando em parceria com as famílias e a comunidade.
                </p>
            </section>

            <div className="w-500 h-400">
                <img className="rounded-3xl" src={fotoEscola} alt="Foto da escola" />
            </div>

        </section>

    )
}


export default Escola;