import React from "react";
import "./boxInputs.css";

const BoxInputs = ({ title, isValid, thereIsError, children }) => {
    return (
        <div
            className="box-inputs-container"
            style={{ 
                backgroundColor: isValid ? "#1976d2" : thereIsError ? "#ff0000" : "#edebeb",
                color: isValid || thereIsError ? "#fff" : "#000",
            }}
        >
            <div className="box-inputs-title">
                {title}
            </div>
            <div className="box-inputs-content">
                {children}
            </div>            
        </div>
    );
};

export default BoxInputs;