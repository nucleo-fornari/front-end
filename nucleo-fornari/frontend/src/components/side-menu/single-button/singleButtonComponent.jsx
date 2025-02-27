import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './singleButtonComponent.css'

const SingleButtonComponent = ({btnIcon, btnText, activeRoute, isCollapsed, navigateUrl, event, emit}) => {

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();
    const actualRoute = useLocation().pathname;

    useEffect(() => {
        const active = activeRoute && activeRoute.some(route => route === actualRoute);
        setIsActive(active);
    }, [activeRoute, actualRoute]);

    const logout = () => {
        sessionStorage.clear();
        navigate("/login")
      }

    const handleClick = () => {
        if(navigateUrl === undefined) {
            if(event === "logout") {
                logout();
            }
            if(event === "toggleMenu") {
                emit(!isCollapsed)
            }
        } else {
            navigate(navigateUrl)
        }
    };

    return (
        <div className={
            `single-button-component__container
            ${event === "logout" ? "single-button-component__container-logout-active" : 
            isActive ? "single-button-component__container-active" : ""}`
            }
            onClick={() => handleClick()}
        >
            <div class="btn">

                <img class="btn-icon" src={btnIcon} alt="" />

                {!isCollapsed && (
                    <span class="text">{btnText}</span>
                )}            
            </div>
        </div>
        
    
    )
}

export default SingleButtonComponent;