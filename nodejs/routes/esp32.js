const express = require('express');
const router = express.Router();

// POST 요청을 처리하는 엔드포인트 (ESP32에서 보낸 데이터 수신)
router.get('/test', (req, res) => {
  //console.log(req.query);
  
    const { temperature, waterLevel, waterStatus } = req.query;

    console.log('Received data from ESP32:', {
        temperature,
        waterLevel,
        waterStatus,
    });

    res.status(200).json({
        success: true,
        message: 'Data received successfully!',
    });
});

module.exports = router;
