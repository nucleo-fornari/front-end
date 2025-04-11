import React from "react";
import "./boxInputs.css"

const BoxInputs = ({title, children}) => {

    return (
        <div className="box-inputs-container">
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