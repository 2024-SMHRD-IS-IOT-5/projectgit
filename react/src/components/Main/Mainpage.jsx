import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./main.css"


const Mainpage = () => {

    const navigate=useNavigate()
    const [currentTemp,setCurrentTemp]=useState(38)
    const [fold,setFold]=useState('덮개 off')
    const [water,setWater]=useState('급수 off')

    const [foldicon,setFoldicon]=useState("/emoji/folded.png")
    const [foldbool,setFoldbool]=useState(false)
    
    const [watericon,setWatericon]=useState("/emoji/water.png")
    const [waterbool,setWaterbool]=useState(false)

    const foldChange=(e)=>{
      setFoldbool(!foldbool)
      if(!foldbool){
        setFoldicon("/emoji/fold.png")
        setFold('덮개 on')
      }else{
        setFoldicon("/emoji/folded.png")
        setFold('덮개 off')
      }
    }

    const waterChange=(e)=>{
      setWaterbool(!waterbool)
      if(!waterbool){
        setWatericon("/emoji/water.png")
        setWater('급수 on')

      }else{
        setWatericon("/emoji/watered.png")
        setWater('급수 off')
      }
    }

  return (
    <div>
      {/* 헤더 */}
      <header className='header'>
        <h6>프로필명</h6>
        {/* 프로필명은 프로필 선택 시 DB에서 값 가져와서 출력해야함 */}
        <h6>현재 온도 : {currentTemp}°C</h6>
        <h6>설정 온도 : {currentTemp}°C</h6>
        {/* 현재 온도나 세팅 온도 설정을 하면 DB에 저장하고 그 값을 불러와서 출력 */}
        <img src="./emoji/profile-icon.png" alt='profile' width='30px' height='30px' onClick={()=>navigate("/profile")}/>
      </header>
      {/* 사진 */}
      <div className='main-image'>
        <img src="./emoji/spa-icon.png" alt='spa'/>
      </div>
      
      {/* 중간 기능  */}
      <div className='main-icons'>
          <div className='toolbar-item' onClick={waterChange} >
            <img src={watericon} alt="water" className='icon'/>
            <span>{water}</span>
          </div>
          <div className='toolbar-item' onClick={()=>navigate("/water-temp")}>
            <img src="./emoji/water-temp.png" alt="watertemp" className='icon'/>
            <span>온도 조절</span>
          </div>
          <div className='toolbar-item' onClick={foldChange}>
            <img src={foldicon} alt='fold'  className='icon' />
            <span>{fold}</span>
          </div>
        </div> 

      {/* 쇼핑몰 */}
      

      
      
      
    </div>
  )
}

export default Mainpage