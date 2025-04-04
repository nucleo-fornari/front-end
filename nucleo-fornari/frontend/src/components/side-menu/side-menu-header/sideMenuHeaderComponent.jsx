import React from "react";
import './sideMenuHeaderComponent.css'
import logoBrancoIcon from '../../../assets/imgs/logoBrancoIcon.png'
import logoText from '../../../assets/imgs/logoText.png'

const SideMenuHeaderComponent = ({userName, isCollapsed}) => {

    return (
        <div>
            <div>
                <img className={`${!isCollapsed ? "logo-icon-expanded" : "logo-icon-collapsed"}`} src={logoBrancoIcon} alt="" />
                {!isCollapsed && (
                    <img className="logo-text" src={logoText} alt="núcleo fornari" />
                )}                
            </div>            
            {!isCollapsed &&(
                <div className="container-info">
                    <span className="whitespace-nowrap text-nowrap">Olá, {`${!userName ? "user" : userName}`}</span>
                </div>
            )}
        </div>
    )
}

export default SideMenuHeaderComponent;