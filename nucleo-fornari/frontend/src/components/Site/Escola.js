import fotoEscola from '../../assets/imgs/fotoEscola.png'

function Escola() {

    return (

        <section className="w-full flex items-center justify-evenly p-16 bg-blue-pastel">

            <section className='size-2/5'>
                <h1 className='text-5xl py-6 text-blue-dark'>
                    A escola
                </h1>
                <p className='text-justify'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed in consectetur justo, id vulputate dolor. Proin dignissim
                    odio ut quam fringilla, nec tristique elit gravida
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida
                    Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed in consectetur justo, id vulputate dolor. Proin dignissim odio ut quam fringilla, nec tristique elit gravida
                </p>
            </section>

            <div className="w-500 h-400">
                <img className="rounded-3xl" src={fotoEscola} alt="Foto da escola" />
            </div>

        </section>

    )
}


export default Escola;