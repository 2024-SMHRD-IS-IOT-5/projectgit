import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./main.css"
import axios from 'axios'

const Mainpage = () => {
  const [currentTemp, setCurrentTemp] = useState(null);
  const [currentSetTemp, setCurrentSetTemp] = useState(38);
  // Node.js 서버에서 데이터를 가져오는 함수
  const fetchTemperature = async () => {
    await axios.get('http://localhost:3001/api/sensor/currentWaterTemp')
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.currentWaterTemp);
          setCurrentTemp(res.data.currentWaterTemp);
        } else {
          console.log('failed to fetch temperature', res.data.message);
        }
      })
      .catch((error) => {
        console.error('Mainpage.js Failed to fetch sensor data:', error)
      })
    // try {
    //   const response = await axios.get('http://localhost:3001/api/sensor/currentWaterTemp'); // Node.js 엔드포인트
    //   console.log(axios.get('http://localhost:3001/api/sensor/currentWaterTemp'));  
    //   if (response.data.success) {
    //     setCurrentTemp(response.data.currentWaterTemp);
    //   } else{
    //     console.log('failed to fetch temperature', response.data.message);
    //   }
    // } catch (error) {
    //   console.error('Mainpage.js Failed to fetch sensor data:', error);
    // }
  };
  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchTemperature();
    const interval = setInterval(fetchTemperature, 5000); // 5초마다 데이터 가져오기
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false); // 상태 관리
  const [foldOn, setFoldOn] = useState(false); // 덮개 상태

  const handleWater = async () => {
    await axios.post('http://localhost:3001/control')
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(res.data.currentWaterTemp);
        console.log(res.data.success);
        setCurrentTemp(res.data.currentWaterTemp);
      } else {
        console.log('failed to fetch temperature', res.data.message);
      }
    })
    .catch((error) => {
      console.error('Mainpage.js Failed to fetch sensor data:', error)
    })
    // const newState = !isOn;
    // setIsOn(newState);

    // const command = { action: newState ? "1" : "0" };
    // try {
    //   const response = await axios.post('/control', command, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log("Response from ESP32:", response.data);
    //   alert(`ESP32 response: ${response.data}`);
    // } catch (error) {
    //   console.error("Failed to send command:", error);
    //   alert("Error sending command to ESP32");
    // }
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
        <h6>설정 온도 : {currentSetTemp}°C</h6>
        {/* 현재 온도나 세팅 온도 설정을 하면 DB에 저장하고 그 값을 불러와서 출력 */}
        <img src="./emoji/profile-icon.png" alt='profile' width='30px' height='30px' onClick={() => navigate("/profile")} />
      </header>
      {/* 사진 */}
      <div className='main-image'>
        <img src="./emoji/spa-icon.png" alt='spa' />
      </div>

      {/* 중간 기능  */}
      <div className='main-icons'>
        <div className='toolbar-item' onClick={handleWater} >
          <img
            src={isOn ? '/emoji/water.png' : '/emoji/watered.png'} alt="water" className='icon' />
          <span>{isOn ? '급수 On' : '급수 Off'}</span>
        </div>

        <div className='toolbar-item' onClick={() => navigate("/water-temp")}>
          <img src="./emoji/water-temp.png" alt="watertemp" className='icon' />
          <span>온도 조절</span>
        </div>
        <div className='toolbar-item' onClick={handleFold}>
          <img src={foldOn ? "/emoji/fold.png" : "/emoji/watered.png"} alt='fold' className='icon' />
          <span>{foldOn ? '덮개 On' : '덮개 Off'}</span>
        </div>
      </div>

      {/* 쇼핑몰 */}





    </div>
  )
}

export default Mainpage