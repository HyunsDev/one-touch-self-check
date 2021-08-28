import React from "react";
import "../css/header.scss"

function Header(){
    return (
        <div className="header">
            <div onClick={() => {
            localStorage.removeItem('isSet')
            window.location.replace("/")
            }}><span>원터치 자가진단</span> - 서령고등학교</div>
        </div>
    )
}

export default Header