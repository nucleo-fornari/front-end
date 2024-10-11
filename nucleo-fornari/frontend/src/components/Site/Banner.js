import Button from "./Button";


function Banner () {
    return(
        <section className="bg-white-cinzabg items-center justify-center flex flex-col">
        <div className=" text-blue-main text-center text-7xl text-wrap p-28 leading-loose">
            Integração de tecnologia com educação de <span className="text-purple-main">qualidade</span>
        </div>
        <Button text="Explorar"/>
        </section>
    )
}

export default Banner;