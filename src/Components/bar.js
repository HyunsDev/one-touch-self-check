import React, { useState, useEffect } from "react";
import "../css/bar.scss"

function Bar(props){
    const [status, setStatus] = useState("")
    useEffect(() => {
        if (props.status == "main") {
            setStatus("Bar-diagonal")
        } else if (props.status == "setting") {
            setStatus("Bar-line")
        } else if (props.status == "loading") {
            setStatus("Bar-loading")
        } else {
            setStatus("")
        }
    }, [props.status])

    return (
        <div className={"Bar " + (status || "")}></div>
    )
}

export default Bar