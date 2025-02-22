import React from "react";
import { Link, useLocation } from "react-router-dom";
import './singleButtonComponent.css'

const SingleButtonComponent = ({btnIcon, btnText, activeRoute, isCollapsed, navigateUrl}) => {

    const actualRoute = useLocation();

    return (
        <Link to={navigateUrl}>
        <div className={
            `single-button-component__container
            ${actualRoute.pathname === activeRoute ? "single-button-component__container-active" : "single-button-component__container"}`
            }
        >
            <div class="btn">

                <img class="btn-icon" src={btnIcon} alt="" />

                {!isCollapsed && (
                    <span class="text">{btnText}</span>
                )}            
            </div>
        </div>
        </Link>
        
    
    )
}

export default SingleButtonComponent;