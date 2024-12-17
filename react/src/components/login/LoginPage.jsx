import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosIns";
import "./login.css"; // CSS 파일 import

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 백엔드 서버로 POST 요청 보내기
      const response = await axios.post("/login", credentials);

      if (response.data.success) {
        localStorage.setItem("username", response.data.username); // username 저장
        alert("로그인 성공!");
        navigate("/profile"); // 로그인 성공 시 프로필 선택 페이지로 이동
      } else {
        setError(response.data.message); // 서버에서 반환된 에러 메시지 표시
      }
    } catch (error) {
      console.error("로그인 실패:", error.response?.data || error.message);
      setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;