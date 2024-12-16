const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'..' , '..', 'react', 'build', 'index.html'))
})

// 사용자가 a태그로 회원가입을 요청하는 경우
router.get("/signup",(req,res)=>{    
    res.json({ message: "회원가입 페이지 요청을 처리 중입니다." });
})

// 사용자가 로그인을 요청하는 경우
router.get("/login",(req,res)=>{
    res.json({ message: "로그인 페이지 요청을 처리 중입니다." });
})

// 사용자가 회원정보 수정할 때
router.get("/update",(req,res)=>{
    res.json({ message: "회원정보 수정 요청을 처리 중입니다." });
})

// 사용자가 회원정보 탈퇴할 때
router.get("/delete",(req,res)=>{
    res.json({ message: "회원탈퇴 요청을 처리 중입니다." });
})

module.exports = router;
