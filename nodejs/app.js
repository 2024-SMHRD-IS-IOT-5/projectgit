const express = require("express");
const app = express();
const bp = require("body-parser");
const cors = require('cors');
const nunjucks = require("nunjucks");
const mainrouter = require("./routes/mainrouter");
const userrouter = require("./routes/userrouter");
// 프로필 화면
const session = require("express-session");
const path = require("path");

const coverrouter = require("./routes/coverrouter");//덮개
const w_setrouter = require("./routes/w_setrouter");//수위설정
const waterrouter = require("./routes/waterrouter");//급수
const wrouter = require("./routes/wrouter");        //물상태

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, '..', 'react', 'build'))); // 리액트 프로그램 경로 설정



app.use(bp.urlencoded({extended:true}));
app.use("/", mainrouter);
app.use("/user", userrouter);


app.use("/cover",coverrouter); //덮개
app.use("/w_set",w_setrouter); //수위설정
app.use("/water",waterrouter); //급수
app.use("/w",wrouter);         //물상태


app.set("view engine", "html")
nunjucks.configure("views", {
    express : app,
    watch : true
})

app.listen(3000);
