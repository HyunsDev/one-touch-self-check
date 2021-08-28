import React, { useState, useEffect } from "react";
import axios from "axios"
import Header from "../Components/header.js";
import Bar from "../Components/bar";
import "../css/main.scss";
import { toast } from 'react-toastify';
import dotenv from 'dotenv';
dotenv.config()

function App(props){
    
    // 상태 관리
    const [barStatus, setBarStatus] = useState({
        status: "main",
        text: ""
    })
    const [btnStatus, setBtnStatus] = useState({
        text: "원터치 자가진단 등록",
        isAble: true,
        function: () => {
            setBottom(<Step1 />)
        }
    })
    const [bottom, setBottom] = useState(<>
        <p>원터치 자가진단</p>
        <h1>터치 한 번으로<br />자가진단을 완료해보세요!</h1>
    </>)

    useEffect(() => {
        console.log(localStorage.getItem("isSet") === true)
        if (localStorage.getItem("isSet")) {
            setBottom(<Loading />)
        }
    }, []) 


    // 컴포넌트
    function Step1() {
        const [inputValue, setInputValue] = useState(localStorage.getItem("name") || "")
        const inputRef = React.useRef(null);

        useEffect(() => {
            setBarStatus({
                status: "setting-1",
                text: ""
            })
            setBtnStatus({
                text: "이름을 입력하세요",
                isAble: false,
                function: null
            })
            inputRef.current.focus();
            onInputChange(inputValue)
        }, [])
        
        const onInputChange = (value) => {
            setInputValue(value)
            if (value.length < 2) {
                setBtnStatus({
                    text: "이름을 입력하세요",
                    isAble: false,
                    function: null
                })
            } else if (value.length > 4) {
                setBtnStatus({
                    text: `올바른 이름을 입력하세요`,
                    isAble: false,
                    function: null
                })
                
            } else {
                setBtnStatus({
                    text: `${value}님으로 계속합니다.`,
                    isAble: true,
                    function: () => {
                        localStorage.setItem("name", value)
                        setBottom(<Step2 />)
                    }
                })
            }
        }
        

        const onEnter = (e) => {
            if (e.key === "Enter") {
                if (1 < inputValue.length && inputValue.length < 5) {
                    localStorage.setItem("name", inputValue)
                    setBottom(<Step2 />)
                }
            }
        }

        return (
            <>
                <p>원터치 자가진단 - 1/3</p>
                <h1>이름을 입력하세요</h1>
                <div className="btns">
                    <input type="text" placeholder="박현우" value={inputValue} onChange={e => onInputChange(e.target.value)} onKeyPress={onEnter} ref = {inputRef}/>
                </div>
            </>
        )
    }

    // 생년월일
    function Step2() {
        const [inputValue, setInputValue] = useState(localStorage.getItem("birth") || "")
        const inputRef = React.useRef(null);

        useEffect(() => {
            setBarStatus({
                status: "setting-2",
                text: ``
            })
            setBtnStatus({
                text: "생년월일을 입력하세요",
                isAble: false,
                function: null
            })
            inputRef.current.focus();
            onInputChange(inputValue)
        }, [])
        
        const onInputChange = (value) => {
            setInputValue(value)
            if (value.length < 6) {
                setBtnStatus({
                    text: "생년월일을 입력하세요",
                    isAble: false,
                    function: null
                })
            } else if (/^0\d[01]\d[0123]\d$/.test(value)) {
                setBtnStatus({
                    text: `20${value.slice(0,2)}년 ${value.slice(2,4)}월 ${value.slice(4,6)}일`,
                    isAble: true,
                    function: () => {
                        localStorage.setItem("birth", value)
                        setBottom(<Step3 />)
                    }
                })
                
            } else {
                setBtnStatus({
                    text: "정확한 생년월일을 입력하세요",
                    isAble: false,
                    function: null
                })
            }
        }

        const onEnter = (e) => {
            if (e.key === "Enter") {
                if (/^0\d[01]\d[0123]\d$/.test(inputValue)) {
                    localStorage.setItem("birth", inputValue)
                    setBottom(<Step3 />)
                }
            }
        }

        return (
            <>
                <p>원터치 자가진단 - 2/3</p>
                <h1>생년월일을 입력하세요</h1>
                <div className="btns">
                    <input type="text" placeholder="040708" value={inputValue} onChange={e => onInputChange(e.target.value)} onKeyPress={onEnter} ref = {inputRef} />
                </div>
            </>
        )
    }

    // 비밀번호
    function Step3() {
        const [inputValue, setInputValue] = useState(localStorage.getItem("password") || "")
        const inputRef = React.useRef(null);

        useEffect(() => {
            setBarStatus({
                status: "setting-3",
                text: ""
            })
            setBtnStatus({
                text: "자가진단 비밀번호를 입력하세요",
                isAble: false,
                function: null
            })
            inputRef.current.focus();
            onInputChange(inputValue)
        }, [])
        
        const onInputChange = (value) => {
            setInputValue(value)
            if (value.length < 4) {
                setBtnStatus({
                    text: "자가진단 비밀번호를 입력하세요",
                    isAble: false,
                    function: null
                })
            } else if (/^\d\d\d\d$/.test(value)) {
                setBtnStatus({
                    text: `이 비밀번호로 계속합니다.`,
                    isAble: true,
                    function: () => {
                        localStorage.setItem("password", value)
                        setBottom(<Loading isNew={true} />)
                    }
                })
                
            } else {
                setBtnStatus({
                    text: "정확한 자가진단 비밀번호를 입력하세요",
                    isAble: false,
                    function: null
                })
            }
        }

        const onEnter = (e) => {
            if (e.key === "Enter") {
                if (/^\d\d\d\d$/.test(inputValue)) {
                    localStorage.setItem("password", inputValue)
                    setBottom(<Loading isNew={true} />)
                }
            }
        }

        return (
            <>
                <p>원터치 자가진단 - 3/3</p>
                <h1>자가진단 비밀번호를 입력하세요</h1>
                <div className="btns">
                    <input type="text" placeholder="0000" value={inputValue} onChange={e => onInputChange(e.target.value)} onKeyPress={onEnter} ref = {inputRef} />
                </div>
            </>
        )
    }

    // 로딩
    function Loading(props) {
        useEffect(() => {
            ;(async () => {
                setBarStatus({
                    status: "loading",
                    text: ""
                })
                setBtnStatus({
                    text: "잠시 기다려주세요",
                    isAble: false,
                    // function: null
                    function: null
                })
    
                try {
                    console.log(process.env.REACT_APP_API_SERVER)
                    await axios.post(`http://192.168.0.19:3001/v1/check`, {
                        name: localStorage.getItem("name"),
                        birth: localStorage.getItem("birth"),
                        password: localStorage.getItem("password")
                    })
                    localStorage.setItem("isSet", true)
                    setBottom(<Done isNew={props.isNew || false} />)

                } catch (err) {
                    localStorage.setItem("isSet", false)
                    console.error(err)
                    if (err.response) {
                        console.error(err.response)
                        switch (err.response.data.code) {
                            case "need_more_info":
                                toast.error("필수 정보가 누락되었어요", { theme: "colored" })
                                localStorage.clear()
                                setBottom(<Step1 />)
                                break
    
                            case "first_login_failed":
                                toast.error("이름과 생년월일을 확인하세요", { theme: "colored" })
                                localStorage.clear()
                                setBottom(<Step1 />)
                                break
    
                            case "second_login_failed":
                                toast.error("비밀번호를 확인하세요!", { theme: "colored" })
                                localStorage.setItem("password", "")
                                setBottom(<Step3 />)
                                break
                            
                            case "wait_please":
                                toast.error(`${err.response.data.minutes}분후에 재시도해주세요`, { theme: "colored" })
                                setBottom(<Step3 />)
                                break
    
                            case "wrong_password":
                                toast.error("비밀번호를 확인하세요!", { theme: "colored" })
                                localStorage.setItem("password", "")
                                setBottom(<Step3 />)
                                break

                            default:
                                toast.error("자가진단을 하지 못했어요. 다시 시도해주세요", { theme: "colored" })
                                setBottom(<Step3 />)
                                break
                        }
                    } else if (err.request) {
                        toast.error("서버 연결에 실패했어요. 다시 시도해주세요", { theme: "colored" })
                        setBottom(<Step3 />)
                    } else {
                        toast.error("문제가 생겼어요. ", { theme: "colored" })
                        setBottom(<Step3 />)
                    }
                }
            })()
        }, [])
        

        return (
            <>
                <p>원터치 자가진단 - 연결중</p>
                <h1>잠시 기다려주세요</h1>
            </>
        )
    }

    // 완료
    function Done(props) {
        useEffect(() => {
            setBarStatus({
                status: "success",
                text: `${localStorage.getItem("name")}(${localStorage.getItem("birth")})`
            })
            if (props.isNew) {
                setBtnStatus({
                    text: "원터치을 위해 홈 화면에 바로가기를 추가해주세요!",
                    isAble: false,
                    function: null
                })
            } else {
                setBtnStatus({
                    text: `이제 앱을 닫아주세요`,
                    isAble: false,
                    function: null
                })
                // let count = 4
                // const timer = setInterval(() => {
                //     count = count - 1
                //     if (count < 1) {
                //         clearInterval(timer)
                //         window.close()
                //     }
                //     setBtnStatus({
                //         text: `${count}초 뒤에 창을 닫을게요`,
                //         isAble: false,
                //         function: () => {
                //             clearInterval(timer)
                //             window.close()
                //             setBtnStatus({
                //                 text: `자동 창 닫기를 취소했어요`,
                //                 isAble: false,
                //                 function: null
                //             })
                //         }
                //     })
                // }, 1000)
            }
        }, [props.isNew])

        return (
            <>
                <p onClick={() => {localStorage.clear(); window.location.replace("/")}}>
                    {localStorage.getItem("name")}({localStorage.getItem("birth")})
                </p>
                <h1>{props.isNew ? "원터치 자가진단이 완료되었어요!" : "자가진단이 완료되었어요."}</h1>
            </>
        )
    }
    
            
    return (
        <div className="main">
            <Header />
            <Bar status={barStatus.status} text={barStatus.text} />
            <div className="bottoms">
                {bottom}
                <div className={btnStatus.isAble ? "main-btn" : "main-btn disable"} onClick={btnStatus.function}>{btnStatus.text}</div>
            </div>
        </div>
    )
}

export default App