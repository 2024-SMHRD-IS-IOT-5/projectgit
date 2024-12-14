import React, { useState } from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import WaterTemperature from "./components/water-temp/WaterTemp.jsx"; // 물 온도 설정 페이지 컴포넌트
import HomePage from "./components/Home/Homepage.jsx"; // 초기 화면 컴포넌트
import LoginPage from "./components/login/LoginPage.jsx"; // 로그인 페이지 컴포넌트
import SignupBy from "./components/signup/SignupBy.jsx";
import Mainpage from "./components/Main/Mainpage.jsx"
import Shoppingmall from "./components/shopping/Shopmall.jsx";
import Profile from "./components/profile/Profile.jsx"
import Setting from "./components/set/Setting.jsx";
import Navigation from "./components/Navi/Navigation.jsx";
import Asd from "./components/Asd.jsx"

const App = () => {

  const[currentTemp,setCurrentTemp]=useState(38)
  
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupBy />} />
          <Route path="/water-temp" element={<WaterTemperature currentTemp={currentTemp}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<Mainpage setCurrentTemp={setCurrentTemp}/>}/>
          <Route path="/shopping" element={<Shoppingmall/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/setting" element={<Setting/>}/>
          <Route path="/asd" element={<Asd/>}/>
        </Routes>

        {!["/","/login","/signup","/profile"].includes(window.location.pathname)&&(
          <Navigation/>
        )}
        

      </Router>
    </div>
  );
};

export default App;