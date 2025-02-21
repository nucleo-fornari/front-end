

const SingleButtonComponent = ({btnIcon, btnText, activeRoute, isCollapsed}) => {

return (
    <div className="flex">
        <img src={btnIcon} alt="" />
        <span>{btnText}</span>
    </div>
)
}

export default SingleButtonComponent;