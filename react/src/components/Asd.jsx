import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./asd.css"

const Setting = () => {
  const navigate = useNavigate();

  const [switches, setSwitches] = useState([
    { label: "수위 알림", isOn: false },
    { label: "온도 알림", isOn: false },
    { label: "아로마 추천 알림", isOn: false },
    { label: "전체 알림", isOn: false },
  ]);

  const toggleSwitch = (index) => {
    setSwitches((prevSwitches) =>
      prevSwitches.map((sw, i) =>
        i === index
          ? { ...sw, isOn: !sw.isOn } // 상태 토글
          : sw
      )
    );
  };

  return (
    <div>
      {/* 헤더 */}
      <header>
        <button onClick={() => navigate(-1)}>X</button>
        <h1>설정</h1>
      </header>

      {/* 본문 */}
      <div className="settings-container">
        {switches.map((sw, index) => (
          <div key={index} className="setting-item">
            <span>{sw.label}</span>
            <div
              className={`switch ${sw.isOn ? "switch-on" : "switch-off"}`}
              onClick={() => toggleSwitch(index)}
            >
              <div className="switch-thumb"></div>
            </div>
          </div>
        ))}
      </div>

      <br />

      {/* 로그아웃 버튼 */}
      <div>
        <button className="logout-button" onClick={() => navigate("/")}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Setting;
