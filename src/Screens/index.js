import React, { useState } from "react";
import Header from "../Components/header.js";
import Bar from "../Components/bar";
import "../css/main.scss";


function App(props){
    const [content, setContent] = useState({
        subTitle: <>원터치 자가진단</>,
        title: <>터치 한 번으로<br />자가진단을 완료해보세요!</>,
        btnText: <>원터치 자가진단 등록</>
    })

    return (
        <div className="main">
            <Header  />
            <Bar />
            <div className="bottoms">
                <p>{content.subTitle}</p>
                <h1>{content.title}</h1>
                <div className="main-btn">
                    {content.btnText}
                </div>
            </div>
        </div>
    )
}

export default App