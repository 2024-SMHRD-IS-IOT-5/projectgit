import React, { useState } from "react";
import "./Profile.css"
import Card from "./Card";


const initialProfiles = [
  { id: 1, name: "박창영", image: "/img/profile5.png" },
];

const ProfileSelector = () => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [editingProfile, setEditingProfile] = useState(null);
  const [newName, setNewName] = useState("");

  const handleAddProfile = (newProfile) => {
    const newId = profiles.length + 1;
    setProfiles([
      ...profiles,
      { id: newId, name: `새 프로필 ${newId}`, image: "/img/default.png" },
    ]);
  };


  // 프로필 수정 모드 활성화
  const handleEditProfile = (profile) => {
    console.log("Editing profile:", profile); // 디버깅 메시지 추가
    setEditingProfile(profile.id);
    setNewName(profile.name);
  };
  
  const handleSaveEdit = (id) => {
    console.log("Saving profile with id:", id); // 디버깅 메시지 추가
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, name: newName } : profile
      )
    );
    setEditingProfile(null);
    setNewName("");
  };

  // 프로필 삭제
  const handleDeleteProfile = (id) => {
    console.log("Deleting profile with id:", id); // 디버깅 메시지 추가
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <div className="profile-selector">
      <header className="profile-header">
        <h2>님 안녕하세요</h2>
          <p>프로필을 선택해주세요</p>
      </header>

      <div className="profile-list">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            profile={profile}
            isEditing={editingProfile === profile.id}
            newName={newName}
            setNewName={setNewName}
            onEdit={() => handleEditProfile(profile)} // 수정 전달
            onSave={() => handleSaveEdit(profile.id)} // 저장 전달
            onDelete={() => handleDeleteProfile(profile.id)} // 삭제 전달
          />
        ))}
        <div
        className="add-profile"
        onClick={() => handleAddProfile({ name: "새로운 프로필" })}
        >
        +
        </div>
    </div>
    </div>
  );
};

export default ProfileSelector;
