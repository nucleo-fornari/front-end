import React, { useState, useEffect } from "react";
import './headerBar.css'

import SingleButtonComponent from "../side-menu/single-button/singleButtonComponent";

import logoutIcon from "../../assets/imgs/logoutIcon.svg";
import logoBrancoIcon from '../../assets/imgs/logoBrancoIcon.png'

const HeaderBar = ({ title }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`container-header ${isMobile ? 'container-header-mobile' : ''}`}>
            <span className={`title ${isMobile ? 'title-mobile' : 'title'}`}>{title}</span>
            <div className={`container-logout`}>
                {isMobile && (
                    <div>
                        <img className={'icon-logo-mobile'} src={logoBrancoIcon} alt="logo nucleo fornari" />
                    </div>
                )}
                {isMobile && (
                    <div>
                        <SingleButtonComponent
                            btnIcon={logoutIcon}
                            btnText={"Sair"}
                            event={"logout"}
                            isMobile={isMobile}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default HeaderBar;