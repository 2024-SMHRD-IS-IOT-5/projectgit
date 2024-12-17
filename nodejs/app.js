const express = require("express");
const app = express();
const bp = require("body-parser");
const cors = require('cors');
const nunjucks = require("nunjucks");
const http=require("http"); // HTTP 서버 생성 , 기장선
// const WebSocket=require("ws");//WebSocket 라이브러리 , 기장선
// const conn = require("../config/db"); // DB 연결정보 가져오기 , 기장선
const session = require("express-session");
const path = require("path");
// const mysql=require("mysql2"); 

// 라우터 임포트
const userrouter = require("./routes/userrouter");
const coverrouter = require("./routes/coverrouter");//덮개
const w_setrouter = require("./routes/w_setrouter");//수위설정
const waterrouter = require("./routes/waterrouter");//급수
const wrouter = require("./routes/wrouter");        //물상태
const esp32 = require('./routes/esp32');

// const Server=http.createServer(app); //HTTP 서버 생성 , 기장선
// const wss=new WebSocket.Server({server}); // WebSocket 서버 생성 , 기장선

// app.use(express.json({ limit: "10kb" }));
app.use(bp.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.json())
// app.use(express.urlencoded({ extended: true, limit: "10kb" })); // URL 인코딩된 요청 제한
// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'react', 'build'))); // 리액트 프로그램 경로 설정

// 미들웨어 설정
app.use(cors({
    origin: 'http://localhost:3000', // React 앱의 URL
    methods:['GET','POST'],
    credentials: true
  }));

app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);
// app.use(bp.urlencoded({extended:true}));


// app.use("/", mainrouter);
app.use("/", userrouter);
app.use("/api/cover",coverrouter); //덮개
app.use("/api/w_set",w_setrouter); //수위설정
app.use("/api/water",waterrouter); //급수
app.use("/api/w",wrouter);         //물상태
app.use("/api/sensor",esp32);

app.get('/test', (req,res)=>{
    console.log("센서데이터:",req.query);
    
})


app.set("view engine", "html")
nunjucks.configure("views", {
    express : app,
    watch : true
})

// WebSocket 설정 , 기장선
// let arudinoData={};
// wss.on("connection", (ws) => {
//     console.log("WebSocket connected");
  
//     ws.on("message", (message) => {
//       console.log("Received from Arduino:", message);
//       try {
//         arduinoData = JSON.parse(message);
//       } catch (err) {
//         console.error("WebSocket message parse error:", err);
//       }
  
//       // React로 데이터 전송
//       wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(JSON.stringify(arduinoData));
//         }
//       });
//     });
  
//     ws.on("close", () => {
//       console.log("WebSocket disconnected");
//     });
//   });


// 정의되지 않은 라우트 처리
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "API 경로를 찾을 수 없습니다." });
});

// 서버 에러 처리
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
  });
