function Button(props) {
    return (
        <button className="text-white-main bg-blue-main py-1 px-8 rounded-2xl font-normal justify-self-end">
            {props.text}
        </button>
    )
}

export default Button;