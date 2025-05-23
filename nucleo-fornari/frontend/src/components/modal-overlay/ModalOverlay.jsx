import React from "react";
import "./ModalOverlay.css"

const ModalOverlayComponent = ({children}) => {
    return (
        <div class="modal-overlay">
            {children}
        </div>
    )
}

export default ModalOverlayComponent;