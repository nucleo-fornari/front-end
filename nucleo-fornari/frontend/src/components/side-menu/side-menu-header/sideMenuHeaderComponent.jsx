import React from "react";
import './sideMenuHeaderComponent.css'
import logoBrancoIcon from '../../../assets/imgs/logoBrancoIcon.png'
import logoText from '../../../assets/imgs/logoText.png'

const SideMenuHeaderComponent = ({userName, isCollapsed}) => {

    return (
        <div>
            <img className={`${!isCollapsed ? "logo-icon-expanded" : "logo-icon-collapsed"}`} src={logoBrancoIcon} alt="" />
            {!isCollapsed &&(
                <div className="container-info">
                    <img className="logo-text" src={logoText} alt="núcleo fornari" />
                    <span>Olá, {`${!userName ? "user" : userName}`}</span>
                </div>
            )}
        </div>
    )
}

export default SideMenuHeaderComponent;