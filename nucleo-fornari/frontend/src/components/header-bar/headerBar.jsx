import React from "react";
import './headerBar.css'

const HeaderBar = ({title}) => {
    return (
        <div className={'container-header'}>
            <span className={'title'}>{title}</span>
        </div>
    )
}

export default HeaderBar;