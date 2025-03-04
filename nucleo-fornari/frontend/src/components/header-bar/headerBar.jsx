import React, { useState, useEffect } from "react";
import './headerBar.css'

import SingleButtonComponent from "../side-menu/single-button/singleButtonComponent";

import logoutIcon from "../../assets/imgs/logoutIcon.svg";

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
        <div className={`container-header ${isMobile ? 'container-header-mobile' : ''}` }>
            <span className={`title ${isMobile ? 'title-mobile' : 'title'}`}>{title}</span>
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
    )
}

export default HeaderBar;