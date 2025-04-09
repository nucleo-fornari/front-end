import React from "react";


const BoxInputs = ({title, children}) => {

    return (
        <div className="width-100">
            <div className="box-inputs-title">
                {title}
            </div>
            <div className="box-inputs-content">
                {children}
            </div>            
        </div>
    )
}

export default BoxInputs;