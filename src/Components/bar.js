import React, { useState, useEffect } from "react";
import "../css/bar.scss"

function Bar(props) {
    const [status, setStatus] = useState("")
    // const [text, setText] = useState("")
    useEffect(() => {
        // setText(props.text)
        if (props.status === "main") {
            setStatus("Bar-diagonal")
        } else if (props.status === "setting-1") {
            setStatus("Bar-setting-1")
        } else if (props.status === "setting-2") {
            setStatus("Bar-setting-2")
        } else if (props.status === "setting-3") {
            setStatus("Bar-setting-3")
        } else if (props.status === "loading") {
            setStatus("Bar-loading")
        } else if (props.status === "success") {
            setStatus("Bar-success")
        } else {
            setStatus("")
        }
    }, [props.text, props.status])

    return (
        <div className="bar-divver">
            <div className={"Bar " + (status || "")}>
                <div className={status !== "Bar-success" ? "loader" : "loader loader-disappear"} />
                {status === "Bar-success" ? <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#ffffff" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <polyline points="172 104 113.333 160 84 132" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
                    <circle cx="128" cy="128" r="96" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                    </svg> : <></>}
            </div>
            {/* <p onClick={() => { 
                console.log("유저 변경")
                localStorage.clear()
                window.location.replace("/")
            }}>{text}</p> */}
        </div>
    )
}

export default Bar