import React, { useState, useEffect } from "react";
import "../css/bar.scss"

function Bar(props){
    const [status, setStatus] = useState("")
    const [text, setText] = useState("")
    useEffect(() => {
        setText(props.text)
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
                <div className="loader"></div>
            </div>
            <p>{text}</p>
        </div>
    )
}

export default Bar