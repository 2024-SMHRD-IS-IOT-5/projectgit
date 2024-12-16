const express = require("express");
const router = express.Router();
// DB연결정보 모듈 호출
const conn = require("../config/db");
const path = require("path");

// 1) 사용자가 회원가입한 데이터를 보냈을 때 처리할 영역
router.post("/signup", (req, res) => {
    const { username, password, height, weight, age } = req.body; // 프론트에서 보낸 데이터 받기

    // 서버로 넘어온 데이터 확인
    console.log("Received Data:", { username, password, height, weight, age });


    // SQL 쿼리: DB에 사용자 정보 저장
    const sql = 'INSERT INTO member (user_id, user_pw, user_h, user_w, user_age)VALUES (?, ?, ?, ?, ?)'
    
    // // 숫자로 형변환
    // const highTemp = Number(req.body.high_temp);
    // const lowTemp = Number(req.body.low_temp);
    // const prefTemp = Number(req.body.pref_temp);

    // // 숫자로 형변환이 됐는지 확인
    // console.log("After Conversion:", { highTemp, lowTemp, prefTemp });

    // // 받아온 post데이터를 DB에 넣는 작업
    // const { user_id, user_pw, user_gender, user_nick, auto_cover } = req.body;

    // // insert를 위한 쿼리문 제작
    // const sql = `
    //     INSERT INTO user_info (
    //         user_id, user_pw, user_gender, user_nick, high_temp, low_temp, pref_temp, auto_cover
    //     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    // `;

    // conn을 통해서 DB와 연결 데이터 + sql 연결
    conn.query(sql, [username, password, height, weight, age], (err, result) => {
        if (err) {
          console.error("Database Error:", err.message);
          return res.status(500).json({ success: false, message: "회원가입 실패", error: err.message });
        }
        res.status(200).json({ success: true, message: "회원가입이 완료되었습니다!" });
      });
});

// 사용자가 로그인을 한 경우
router.post("/login", (req, res) => {
    // 1) req.body안의 데이터를 저장(변수에 넣기) -> 비구조화할당
    let { user_id, user_pw } = req.body;

    // 2) SQL 쿼리문 작성 -> select * from user_info where user_id = ? and user_pw = ?
    let sql = "SELECT * FROM user_info WHERE user_id = ? AND user_pw = ?";

    // 3) conn을 통해서 query를 실행 -> 콘솔창에 rows값 출력
    conn.query(sql, [user_id, user_pw], (err, rows) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ success: false, message: "로그인 처리 중 오류 발생" });
        }
        if (rows.length > 0) {
            // 로그인 성공 - userId를 세션에 저장
            req.session.userId = rows[0].user_id;
            res.status(200).json({ success: true, message: "로그인 성공", user: rows[0] });
        } else {
            res.status(401).json({ success: false, message: "로그인 실패: 아이디 또는 비밀번호가 틀렸습니다." });
        }
    });
});

// 사용자가 회원정보 수정할 때
router.post("/update", (req, res) => {
    let { user_nick, user_gender, pref_temp, auto_cover, user_id, user_pw } = req.body;

    let sql = `
        UPDATE user_info
        SET user_nick = ?, user_gender = ?, pref_temp = ?, auto_cover = ?
        WHERE user_id = ? AND user_pw = ?
    `;

    conn.query(sql, [user_nick, user_gender, pref_temp, auto_cover, user_id, user_pw], (err, rows) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ success: false, message: "회원정보 수정 실패", error: err.message });
        }
        if (rows.affectedRows > 0) {
            res.status(200).json({ success: true, message: "회원정보가 성공적으로 수정되었습니다." });
        } else {
            res.status(400).json({ success: false, message: "회원정보 수정 실패: 잘못된 정보입니다." });
        }
    });
});

// 사용자가 회원정보 탈퇴할 때
router.post("/delete", (req, res) => {
    let { user_id, user_pw } = req.body;

    let sql = "DELETE FROM user_info WHERE user_id = ? AND user_pw = ?";

    conn.query(sql, [user_id, user_pw], (err, rows) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ success: false, message: "회원 탈퇴 실패", error: err.message });
        }
        if (rows.affectedRows > 0) {
            res.status(200).json({ success: true, message: "회원 탈퇴 성공" });
        } else {
            res.status(400).json({ success: false, message: "회원 탈퇴 실패: 잘못된 정보입니다." });
        }
    });
});

// 1) 프로필 목록 가져오기
router.get("/profiles", (req, res) => {
    const userId = req.session.userId; // 세션에서 user_id 가져오기
    if (!userId) {
        return res.status(401).json({ success: false, message: "로그인이 필요합니다." });
    }

    const sql = `
        SELECT profile_id, profile_name, avatar_url 
        FROM profiles 
        WHERE user_id = ?
    `;

    conn.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ success: false, message: "프로필 목록 불러오기 실패", error: err.message });
        }
        res.status(200).json({ success: true, profiles: results });
    });
});

// 2) 선택된 프로필 저장
router.post("/select-profile", (req, res) => {
    const { profileId } = req.body;
    req.session.selectedProfileId = profileId; // 세션에 저장
    res.status(200).json({ success: true, message: "프로필 선택 완료" });
});

// 3) 개인화된 데이터 가져오기
router.get("/user/personalized-data", (req, res) => {
    const profileId = req.session.selectedProfileId;

    if (!profileId) {
        return res.status(400).json({ success: false, message: "선택된 프로필이 없습니다." });
    }

    const sql = `
        SELECT * 
        FROM some_personalized_table 
        WHERE profile_id = ?
    `;

    conn.query(sql, [profileId], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ success: false, message: "개인화된 데이터 불러오기 실패", error: err.message });
        }
        res.status(200).json({ success: true, data: results });
    });
});

module.exports = router;
