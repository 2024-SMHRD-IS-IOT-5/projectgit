import React, { useState } from "react";

const SignupBy = () => {
  const [step, setStep] = useState(1); // 현재 단계
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    height: "",
    weight: "",
    age: "",
  });

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Step 1 유효성 검사 및 Step 2로 이동
  const handleNextStep = () => {
    if (!formData.id || !formData.password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    setStep(2); // Step 2로 이동
  };

  // 최종 제출 (Step 2)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1과 Step 2 데이터를 서버로 전송
    const dataToSend = {
      id: formData.id,
      password: formData.password,
      height: formData.height,
      weight: formData.weight,
      age: formData.age,
    };

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다!");
        setFormData({
          id: "",
          password: "",
          confirmPassword: "",
          height: "",
          weight: "",
          age: "",
        });
        setStep(1);
      } else {
        const result = await response.json();
        alert(`오류: ${result.message}`);
      }
    } catch (error) {
      console.error("회원가입 요청 중 오류 발생:", error);
      alert("서버와 연결할 수 없습니다.");
    }
  };

  return (
    <div>
      {step === 1 ? (
        <form>
          <h2>Step 1: 계정 정보</h2>
          <label>
            아이디:
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            비밀번호:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            비밀번호 확인:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="button" onClick={handleNextStep}>
            다음 단계
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Step 2: 추가 정보</h2>
          <label>
            키 (cm):
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            몸무게 (kg):
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            나이 (선택):
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">회원가입 완료</button>
        </form>
      )}
    </div>
  );
};

export default SignupBy;
