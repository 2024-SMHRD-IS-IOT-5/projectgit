const express = require('express');
const router = express.Router();

let sensorData = {
    temperature: null,
    waterLevel: null,
    waterStatus: null
};
// get 요청을 처리하는 엔드포인트 (ESP32에서 보낸 데이터 수신)
router.get('/data', (req, res) => {
  //console.log(req.query);
  
    const { temperature, waterLevel, waterStatus } = req.query;
    // 데이터 저장
    sensorData = {
        temperature: temperature || sensorData.temperature,
        waterLevel: waterLevel || sensorData.waterLevel,
        waterStatus: waterStatus || sensorData.waterStatus,
    };
    console.log('esp32.js Received data from ESP32:', sensorData);

    res.status(200).json({
        success: true,
        message: 'Data received successfully!',
    });
});
router.get('/currentWaterTemp',(req,res)=>{
    res.status(200).json({
        success: true,
        currentWaterTemp: sensorData.temperature || "No Data",
    });
});

module.exports = router;
