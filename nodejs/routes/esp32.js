const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const router=express.Router();

// 시리얼 포트 설정하기
const port = new SerialPort({
    path: 'COM8', //ESP32가 연결된 port 설정
    baudRate:9600 //ESP32 Serial 통신과 동일한 속도 
});

// 시리얼 데이터 parser
const parser=port.pipe(new ReadlineParser({delimiter: '\n'}));

// ESP32 에서 넘어온 온도 데이터 수신하기
parser.on('data',(data)=>{
    console.log(`ESP32 says : ${data}`)
})

// RESTful API: ESP32로 명령 보내기
router.post('/send', (req, res) => {
    const { command } = req.body;
  
    if (!command) {
      return res.status(400).send('Command is required');
    }
  
    port.write(command + '\n', (err) => {
      if (err) {
        console.error('Error writing to ESP32:', err.message);
        return res.status(500).send('Failed to send command');
      }
      console.log(`Sent to ESP32: ${command}`);
      res.status(200).send(`Command sent: ${command}`);
    });
  });

module.exports=router;