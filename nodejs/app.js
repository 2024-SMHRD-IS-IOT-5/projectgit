const express = require("express");
const app = express();
const bp = require("body-parser");
const nunjucks = require("nunjucks");
const mainrouter = require("./routes/mainrouter");
const userrouter = require("./routes/userrouter");
// 프로필 화면
const session = require("express-session");
const path = require("path");

// 미들웨어 설정
app.use(express.json());
app.use(
    session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, "views")));


app.use(bp.urlencoded({extended:true}));
app.use("/", mainrouter);
app.use("/user", userrouter);


app.set("view engine", "html")
nunjucks.configure("views", {
    express : app,
    watch : true
})

app.listen(3000);
