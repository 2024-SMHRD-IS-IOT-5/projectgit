import React, { useState } from 'react'
import "./watertemp.css"
import { useNavigate } from 'react-router-dom'


const WaterTemp = () => {

    const [temp,setTemp]=useState(38)

    const navigate=useNavigate()
    

    const handleTempChange=(e)=>{
        setTemp(e.target.value)
    }

    const handleSetTemp=(e)=>{
        alert(`온도가 ${temp}°C로 설정되었습니다`) 
    }




return (
    <div className='water-temperature-container'>
        {/* 헤더 */}
        <header className='header'>
            <button className='close-button' onClick={()=>navigate(-1)}>X</button>
            <h1>물 온도 설정</h1>
            
        </header>

        {/* 본문 */}
        <div className='content'>
            <label className='label'>온도</label>
            <input 
                type='range' // 필수!! 인풋 타입을 range로 두면 브라우저에서 제공하는 슬라이더 UI
                min="15" //cold 온도 ->슬라이더 최소값
                max="45" // hot 온도 -> 슬라이더 최대값 
                value={temp}  // 필수!! 슬라이더 기본 세팅 값=>state
                onChange={handleTempChange} // 필수 !! setTemp로 값 변경해주는 함수
                className='slider'
            />
            <div className='temperature-value'>Value : {temp}°C</div>

            <div className='recommendations'>
                <div className='recommendation-box' onClick={()=>setTemp(45)}>
                    Hot
                    <span>45°C</span>
                </div>
                <div className='recommendation-box' onClick={()=>setTemp(41)}>
                    Warm
                    <span>41°C</span>
                </div>
                <div className='recommendation-box' onClick={()=>setTemp(38)}>
                    Neutral
                    <span>38°C</span>
                </div>
                <div className='recommendation-box' onClick={()=>setTemp(24)}>
                    Cool
                    <span>24°C</span>
                </div>
                <div className='recommendation-box' onClick={()=>setTemp(15)}>
                    Cold
                    <span>15°C</span>
                </div>
            </div>

            <button className='set-button' onClick={handleSetTemp}>Settings</button>
        </div>


        {/* 하단 네비게이션 */}
        {/* <div className='footer-toolbar'>
            <div className='toolbar-item' onClick={()=>navigate("/tool")}>
                <img src="/emoji/tool-icon.png" alt="Tool Icon" className='icon'/>
                <span>Tool</span>
            </div>

            <div className='toolbar-item' onClick={()=>{navigate("/main")}}>
                <img src="/emoji/main-icon.png" alt="Main icon" className='icon'/>
                <span>Main</span>
            </div>
            
            <div className='toolbar-item' onClick={()=>{navigate("/setting")}}>
                <img src="/emoji/setting-icon.png" alt="Setting Icon" className='icon'/>
                <span>Setting</span>
            </div>
        </div> */}
    </div>
)
}

export default WaterTemp