const express = require("express");
const app = express();
const bp = require("body-parser");
const cors = require('cors');
const nunjucks = require("nunjucks");

const userrouter = require("./routes/userrouter");
// 프로필 화면
const session = require("express-session");
const path = require("path");

const coverrouter = require("./routes/coverrouter");//덮개
const w_setrouter = require("./routes/w_setrouter");//수위설정
const waterrouter = require("./routes/waterrouter");//급수
const wrouter = require("./routes/wrouter");        //물상태

// 미들웨어 설정
app.use(cors({
    origin: 'http://localhost:3000', // React 앱의 URL
    credentials: true
  }));
app.use(express.json({ limit: "10kb" }));
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // URL 인코딩된 요청 제한

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'react', 'build'))); // 리액트 프로그램 경로 설정



app.use(bp.urlencoded({extended:true}));
// app.use("/", mainrouter);
app.use("/", userrouter);


app.use("/api/cover",coverrouter); //덮개
app.use("/api/w_set",w_setrouter); //수위설정
app.use("/api/water",waterrouter); //급수
app.use("/api/w",wrouter);         //물상태


app.set("view engine", "html")
nunjucks.configure("views", {
    express : app,
    watch : true
})

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
