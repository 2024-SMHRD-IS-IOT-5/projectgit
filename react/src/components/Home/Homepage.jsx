import React from 'react'
import {useNavigate} from "react-router-dom"
import "./Homepage.css"

const Homepage = () => {
    const navigate=useNavigate()

    const handleSignup=()=>{
        navigate("/signup")
    }

    const handleLogin=()=>{
        navigate("/login")
    }


  return (
    <div className='home-container'>
        <div className='content'>
            <h1 className='welcome-title'>앱에 오신 것을 환영합니다</h1>
            <p className='welcome-text'>
                원하는 작업을 선택하세요 :
            </p>
        </div>
        <div className='button-group'>
            <button className='homepage-button signup' onClick={handleSignup}>
                회원가입
                </button>
            <button className='homepage-button login' onClick={handleLogin}>
                로그인
            </button>
        </div>
    </div>
  )
}

export default Homepage