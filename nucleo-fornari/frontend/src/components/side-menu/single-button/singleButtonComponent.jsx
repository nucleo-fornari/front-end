import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './singleButtonComponent.css'

const SingleButtonComponent = ({btnIcon, btnText, activeRoute, isCollapsed, isMobile, navigateUrl, event, emit}) => {

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
            `single-button-component__container ${isMobile ? 'single-button-component__container-mobile' : ''}
            ${event === "logout" ? "single-button-component__container-logout-active" : 
            isActive ? "single-button-component__container-active" : ""}`
            }
            onClick={() => handleClick()}
        >
            <div className={`btn ${isMobile ? 'btn-mobile' : ''}`}>

                <img class="btn-icon" src={btnIcon} alt="" />

                {!isCollapsed && (
                    <span class="text">{btnText}</span>
                )}            
            </div>
        </div>
        
    
    )
}

export default SingleButtonComponent;