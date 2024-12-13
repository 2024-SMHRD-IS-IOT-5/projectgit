const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.render("main");
})

// 사용자가 a태그로 회원가입을 요청하는 경우
router.get("/join",(req,res)=>{
    res.render("join");
})

// 사용자가 로그인을 요청하는 경우
router.get("/login",(req,res)=>{
    res.render("login");
})

// 사용자가 회원정보 수정할 때
router.get("/update",(req,res)=>{
    res.render("update");
})

// 사용자가 회원정보 탈퇴할 때
router.get("/delete",(req,res)=>{
    res.render("delete");
})

module.exports = router;
