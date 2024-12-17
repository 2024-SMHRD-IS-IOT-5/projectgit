import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./main.css"
import axios from 'axios'

// WebSocketComponent 정의
const WebSocketComponent = () => {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    waterLevel: null,
    waterStatus: null,
  });

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.219.61/ws");

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      console.log("Message from ESP32:", event.data);
      const data = JSON.parse(event.data);
      setSensorData({
        temperature: data.temperature,
        waterLevel: data.waterLevel,
        waterStatus: data.waterStatus,
      });
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h6>Temperature: {sensorData.temperature}°C</h6>
      <h6>Water Level: {sensorData.waterLevel}</h6>
      <h6>Water Status: {sensorData.waterStatus}</h6>
    </div>
  );
};

const Mainpage = () => {
  const navigate = useNavigate();
  const [currentTemp, setCurrentTemp] = useState(38); // 현재 온도
  const [isOn, setIsOn] = useState(false); // 상태 관리
  const [foldOn, setFoldOn] = useState(false); // 덮개 상태

  const handleWater = async () => {
    const newState = !isOn;
    setIsOn(newState);

    const command = { action: newState ? "1" : "0" };
    try {
      const response = await axios.post('/control', command, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from ESP32:", response.data);
      alert(`ESP32 response: ${response.data}`);
    } catch (error) {
      console.error("Failed to send command:", error);
      alert("Error sending command to ESP32");
    }
  };

  const handleFold = async () => {
    const newState = !foldOn;
    setFoldOn(newState);

    const command = { action: newState ? "1" : "0" };
    try {
      const response = await axios.post('/fold', command, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from ESP32:", response.data);
      alert(`ESP32 response: ${response.data}`);
    } catch (error) {
      console.error("Failed to send command:", error);
      alert("Error sending command to ESP32");
    }
  };

  
// const Mainpage = () => {

//     const navigate=useNavigate();
//     const [currentTemp,setCurrentTemp]=useState(38); // 현재 온도
//     const [waterTemp,setWaterTemp]=useState(38); // 설정 온도



    // const foldChange=(e)=>{
    //   setFoldbool(!foldbool)
    //   if(!foldbool){
    //     setFoldicon("/emoji/fold.png")
    //     setFold('덮개 on')
    //   }else{
    //     setFoldicon("/emoji/folded.png")
    //     setFold('덮개 off')
    //   }
    // }

    // const waterChange=(e)=>{
    //   setWaterbool(!waterbool)
    //   if(!waterbool){
    //     setWatericon("/emoji/water.png")
    //     setWater('급수 on')

    //   }else{
    //     setWatericon("/emoji/watered.png")
    //     setWater('급수 off')
    //   }
    // }

  //   // 상태 관리
  //   const [isOn,setIsOn]=useState(false);

  //   const handleWater=async ()=>{
  //     const newState=!isOn;
  //     setIsOn(newState);

  //     // 서버로 전송할 값
  //     const command={action: newState ? "1" : "0"};
  //     try{
  //       const response=await axios.post("/control", command,
  //         {
  //           headers : {
  //             "Content-Type" : "application/json",
  //           }
  //         }
  //       )
  //       console.log("response from esp32", response.data)
  //       alert(`esp32 response: ${response.data}`)
  //     } catch(error){
  //       console.error("Failed to send command : ", error)
  //       alert("Error sending command to esp32")
  //     }
  //   }

  //   const [foldOn,setFoldOn]=useState(false);

  //   const handleFold=async ()=>{
  //     const newState=!foldOn;
  //     setFoldOn(newState);
  //     const command=newState ? 1 : 0;
  //     try{
  //       const response=await axios.post("/fold",
  //         command,
  //         {
  //           headers:{
  //             "Content-type": "text/plain"
  //           }
  //         }
  //       )
  //       console.log("response from esp32",response.data)
  //       alert(`esp 32 response ${response.data}`)
  //     } catch(error){
  //       console.error("Failed to send command :", error)
  //       alert("Error sending command to esp32")
  //     }
  //   }

    


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
          <div className='toolbar-item' onClick={handleWater} >
              <img
              src={isOn ? '/emoji/water.png' : '/emoji/watered.png'} alt="water" className='icon'/>
              <span>{isOn ? '급수 On' : '급수 Off'}</span>
            </div>
        
          <div className='toolbar-item' onClick={()=>navigate("/water-temp")}>
            <img src="./emoji/water-temp.png" alt="watertemp" className='icon'/>
            <span>온도 조절</span>
          </div>
          <div className='toolbar-item' onClick={handleFold}>
            <img src={foldOn ? "/emoji/fold.png" : "/emoji/watered.png"} alt='fold'  className='icon' />
            <span>{foldOn ? '덮개 On' : '덮개 Off'}</span>
          </div>
        </div> 

      {/* 쇼핑몰 */}
      

      
      
      
    </div>
  )
}

export default Mainpage