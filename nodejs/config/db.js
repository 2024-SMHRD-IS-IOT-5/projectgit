// DB의 연결정보를 관리하는 파일
// 파일이 호출될 때마다 DB에 연결하는 역할
const mysql = require("mysql2");

// DB연결정보 셋팅
const conn = mysql.createConnection({
    // 사용자의 서버 이름 host네임
    host : "project-db-campus.smhrd.com",
    // 포트번호 지정
    port : 3307,
    // 사용자 계정 정보
    user : "campus_24IS_IOT2_p2_4",
    // 사용자 계정 비밀번호 신은지바보
    password : "smhrd4", 
    // 연결할 데이터베이스 이름
    database : "campus_24IS_IOT2_p2_4"
})


// 실제 DB와 연결
conn.connect((err) => {
    if (err) {
        console.error('데이터베이스 접속 실패')
        return
    }
    console.log('데이터베이스 접속 성공!')
})

module.exports = conn;