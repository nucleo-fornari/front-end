

function TextSection1(props) {
    return (
        <section className="w-full flex">
            <div className="w-756 h-605">
                <img  src={props.image} alt={props.alt} />
            </div>
            

            <section>
                <h1>
                    {props.title}
                </h1>

                <p>
                    {props.text}
                </p>
            </section>

        </section>
    )
}


function TextSection2(props) {
    return (
        <section>

            <section>
                <h1>
                    {props.title}
                </h1>

                <p>
                    {props.text}
                </p>
            </section>


            <img src={props.image} alt={props.alt} />


        </section>
    )
}

export default (TextSection1, TextSection2);