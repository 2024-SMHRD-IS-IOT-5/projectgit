import React, { useEffect, useState } from "react";
import "./Profile.css";
import Card from "./Card";

// 초기 프로필 리스트 설정
const initialProfiles = [
  { id: 1, name: "프로필 1", image: "/img/profile5.png" },
];

// 프로필 선택 컴포넌트
const ProfileSelector = ({ username }) => { // props로 username 받음
  const [profiles, setProfiles] = useState(initialProfiles); // 프로필 목록 상태
  const [editingProfile, setEditingProfile] = useState(null); // 현재 수정 중인 프로필 ID 상태
  const [newName, setNewName] = useState(""); // 수정할 이름 상태
  const [displayName, setDisplayName] = useState(username || "Guest"); // 화면에 표시될 이름

  // username이 없을 경우 기본값 설정 (예: 'Guest')
  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // localStorage에서 username 가져오기
    if (storedUsername) {
      setDisplayName(storedUsername); // localStorage 값이 있으면 설정
    } else if (username) {
      setDisplayName(username); // props로 전달된 username 사용
    }
  }, [username]);

  // 새 프로필 추가
  const handleAddProfile = () => {
    const newId = profiles.length + 1; // 새로운 ID 생성
    setProfiles([
      ...profiles,
      { id: newId, name: `새 프로필 ${newId}`, image: "/img/profile1.jpg" },
    ]);
  };

  // 프로필 수정 모드 활성화
  const handleEditProfile = (profile) => {
    console.log("Editing profile:", profile); // 디버깅 메시지
    setEditingProfile(profile.id); // 수정 중인 프로필 ID 설정
    setNewName(profile.name); // 기존 이름을 입력란에 표시
  };

  // 수정된 프로필 저장
  const handleSaveEdit = (id) => {
    console.log("Saving profile with id:", id); // 디버깅 메시지
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, name: newName } : profile
      )
    );
    setEditingProfile(null); // 수정 모드 종료
    setNewName(""); // 입력 필드 초기화
  };

  // 프로필 삭제
  const handleDeleteProfile = (id) => {
    console.log("Deleting profile with id:", id); // 디버깅 메시지
    setProfiles(profiles.filter((profile) => profile.id !== id)); // 삭제된 프로필 제외
  };

  return (
    <div className="profile-selector">
      {/* 헤더: 사용자 이름과 안내 메시지 */}
      <header className="profile-header">
        <h2 className="greeting-heading">
          {displayName}님 안녕하세요
        </h2>
        <br/>
        <p className="profile-message">프로필을 선택해주세요</p>
      </header>

      {/* 프로필 목록 */}
      <div className="profile-list">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            profile={profile}
            isEditing={editingProfile === profile.id} // 현재 수정 중인지 확인
            newName={newName} // 수정할 이름 상태
            setNewName={setNewName} // 이름 수정 함수 전달
            onEdit={() => handleEditProfile(profile)} // 수정 버튼 클릭 시
            onSave={() => handleSaveEdit(profile.id)} // 저장 버튼 클릭 시
            onDelete={() => handleDeleteProfile(profile.id)} // 삭제 버튼 클릭 시
          />
        ))}
        {/* 새 프로필 추가 버튼 */}
        <div
          className="add-profile"
          onClick={handleAddProfile}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;
