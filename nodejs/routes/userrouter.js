const express = require("express");
const router = express.Router();
// DB연결정보 모듈 호출
const conn = require("../config/db");
const path = require("path");



// 1) 사용자가 회원가입한 데이터를 보냈을 때 처리할 영역
router.post("/join",(req,res)=>{

    console.log(req.body);

    // 숫자로 형변환
    const highTemp = Number(req.body.high_temp);
    const lowTemp = Number(req.body.low_temp);
    const prefTemp = Number(req.body.pref_temp);

    // 숫자로 형변환이 됐는지 확인
    console.log("After Conversion:");
    console.log("After Conversion:", { highTemp, lowTemp, prefTemp });


    // 받아온 post데이터를 DB에 넣는 작업
    const { user_id, user_pw, user_gender, user_nick, auto_cover } = req.body;

    // insert를 위한 쿼리문 제작
    const sql = `
    INSERT INTO user_info (
        user_id, user_pw, user_gender, user_nick, high_temp, low_temp, pref_temp,auto_cover
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;


    
    // conn을 통해서 DB와 연결 데이터 + sql 연결
    // 여기서는 변수명으로 적어주기
    conn.query(
        sql,
        [user_id, user_pw, user_gender, user_nick, highTemp, lowTemp, prefTemp,auto_cover],
        (err, rows) => {
            if (err) {
                console.error("Database Error:", err.message); // SQL 에러 출력
                return res.status(500).json({ success: false, message: "회원가입 실패", error: err.message });
            }
            console.log("Insert Success:", rows);
            res.status(200).json({ success: true, message: "회원가입 성공" });
        }
    );
});


// 사용자가 로그인을 한 경우
router.post("/login",(req,res)=>{
    // 1) req.body안의 데이터를 저장(변수에 넣기) -> 비구조화할당
    let {user_id, user_pw} = req.body;
    // 2) SQL 쿼리문 작성 -> select * from member where id = ? and pw = ?
    let sql = "select * from user_info where user_id = ? and user_pw =?"
    // 3) conn을 통해서 query를 실행 -> 콘솔창에 rows값 출력
    conn.query(sql,[user_id,user_pw],(err, rows)=>{
        console.log(rows);
        // rows는 데이터베이스에서 보내준 결과가 담기는 변수
        // 데이터가 리턴할 때 []배열 형태로 리턴한다.
        // * 결과가 있다면 length가 0보다 크다 / 없다면 0이다.
        if (rows.length > 0) {
            // 로그인 성공 - userId를 세션에 저장
            req.session.userId = rows[0].user_id;
        
            // 프로필 선택 화면으로 리다이렉트
            res.redirect("/user/profiles-page");
        } else {
            res.send("<script>alert('로그인실패'); window.location.href='/login'</script>");
        }
    })
})
router.post("/update",(req,res)=>{
    // 1. 데이터 받기
    // 2. 업데이트문 작성 => 닉네임 (워크벤치 확인)
    // update member set nick = ? where id = ? pw = ?
    // 쿼리 동작 -> 데이터의 순서 생각하기
    // 완료되면 메인페이지로 이동 -> 완료! 회원탈퇴

    let {user_nick, user_gender, pref_temp, auto_cover, user_id, user_pw} = req.body;

    let sql = "update user_info set user_nick = ?, user_gender = ?, pref_temp = ?, auto_cover =? where user_id = ? and user_pw = ?"

    conn.query(sql,[user_nick, user_gender, pref_temp, auto_cover, user_id, user_pw],(err, rows)=>{
        console.log(rows);

        if(rows.affectedRows > 0){
            res.send("<script>alert('완료!'); window.location.href='/'</script>")
        }else{
            res.redirect("/update")
        }
    })
})

router.post("/delete",(req,res)=>{
    // 1. 클라이언트로부터 데이터 받기
    // 2. 탈퇴 SQL 쿼리 작성
    // 3. SQL 실행 및 결과 처리
      // 데이터베이스 에러 처리
    // 4. SQL 실행 결과 확인
      // 성공적으로 탈퇴한 경우 or 탈퇴 실패 (사용자가 없거나 비밀번호가 틀림).

    let {user_id, user_pw} = req.body;

    let sql = "delete from user_info where user_id = ? and user_pw = ?"

    conn.query(sql,[user_id,user_pw],(err, rows)=>{
        console.log(rows);

        if(rows.affectedRows>0){
            res.send("<script>alert('탈퇴완료!'); window.location.href='/'</script>")
        }else{
            res.redirect("/delete")
        }
    })
})


module.exports = router;


// 1) 프로필 목록 가져오기
router.get("/profiles", (req, res) => {
    const userId = req.session.userId; // 세션에서 user_id 가져오기
    if (!userId) {
        return res.status(401).send("로그인이 필요합니다."); // 인증되지 않은 경우
    }

    const sql = `
        SELECT profile_id, profile_name, avatar_url 
        FROM profiles 
        WHERE user_id = ?
    `;
    conn.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).send("프로필 목록을 불러오지 못했습니다.");
        }
        res.json(results); // 프로필 목록 반환
    });
});



// 2) 선택된 프로필 저장
router.post("/select-profile", (req, res) => {
    const { profileId } = req.body;
    req.session.selectedProfileId = profileId; // 세션에 저장
    res.send("프로필 선택 완료");
});

// 3) 개인화된 데이터 가져오기
router.get("/user/personalized-data", (req, res) => {
    const profileId = req.session.selectedProfileId;

    if (!profileId) {
        return res.status(400).send("선택된 프로필이 없습니다.");
    }

    const sql = `
        SELECT * 
        FROM some_personalized_table 
        WHERE profile_id = ?
    `;
    conn.query(sql, [profileId], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).send("개인화된 데이터를 불러올 수 없습니다.");
        }
        res.json(results);
    });
});

// 프로필 선택 화면 렌더링
router.get("/profiles-page", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login"); // 로그인 안 된 경우 로그인 페이지로 리다이렉트
    }

    res.render("profiles"); // Nunjucks를 사용해 profiles.html 렌더링
});


module.exports = router;

// 프로필 생성
router.post("/create-profile", (req, res) => {
    const userId = req.session.userId; // 세션에서 userId 가져오기
    const { profile_name, avatar_url } = req.body;

    if (!userId) {
        return res.status(401).send("로그인이 필요합니다."); // 인증되지 않은 경우
    }

    const sql = `
        INSERT INTO profiles (user_id, profile_name, avatar_url) 
        VALUES (?, ?, ?)
    `;
    conn.query(sql, [userId, profile_name, avatar_url], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).send("프로필 생성에 실패했습니다.");
        }
        res.json({ message: "프로필 생성 완료", profileId: results.insertId });
    });
});

router.get("/personalized-page", (req, res) => {
    // 세션에 선택된 프로필이 없으면 에러 처리
    if (!req.session.selectedProfileId) {
        return res.status(400).send("선택된 프로필이 없습니다. 다시 선택해주세요.");
    }

    // 개인화된 화면 HTML 반환
    res.sendFile(path.join(__dirname, "../views/personalized.html"));
});


// 프로필 수정 API
router.post("/update-profile", (req, res) => {
    const { profileId, profile_name, avatar_url } = req.body;

    if (!profileId) {
        return res.status(400).send("프로필 ID가 제공되지 않았습니다.");
    }

    const sql = `
        UPDATE profiles
        SET profile_name = ?, avatar_url = ?
        WHERE profile_id = ?
    `;
    conn.query(sql, [profile_name, avatar_url, profileId], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).send("프로필 수정에 실패했습니다.");
        }
        res.json({ message: "프로필 수정 완료" });
    });
});


// 프로필 삭제 API
router.post("/delete-profile", (req, res) => {
    const { profileId } = req.body;

    if (!profileId) {
        return res.status(400).send("프로필 ID가 제공되지 않았습니다.");
    }

    const sql = `
        DELETE FROM profiles
        WHERE profile_id = ?
    `;
    conn.query(sql, [profileId], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).send("프로필 삭제에 실패했습니다.");
        }
        res.json({ message: "프로필 삭제 완료" });
    });
});
