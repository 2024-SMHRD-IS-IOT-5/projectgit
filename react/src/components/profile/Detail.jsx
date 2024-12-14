import React, { useState } from "react";
import "./Profile.css"
import Card from "./Card";

const initialProfiles = [
  { id: 1, name: "기장선", image: "/images/profile1.png" },
  { id: 2, name: "장혜원", image: "/images/profile2.png" },
  { id: 3, name: "신은지", image: "/images/profile3.png" },
  { id: 4, name: "정겨운", image: "/images/profile4.png" },
];

const ProfileSelector = () => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [editingProfile, setEditingProfile] = useState(null);
  const [newName, setNewName] = useState("");

  // 프로필 추가
  const handleAddProfile = () => {
    const newId = profiles.length + 1;
    setProfiles([
      ...profiles,
      { id: newId, name: `새 프로필 ${newId}`, image: "/images/default.png" },
    ]);
  };

  // 프로필 수정 모드 활성화
  const handleEditProfile = (profile) => {
    setEditingProfile(profile.id);
    setNewName(profile.name);
  };

  // 수정 완료
  const handleSaveEdit = (id) => {
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
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <div className="profile-selector">
      <header className="profile-header">
        <h2>박창영 님</h2>
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
            onEdit={() => handleEditProfile(profile)}
            onSave={() => handleSaveEdit(profile.id)}
            onDelete={() => handleDeleteProfile(profile.id)}
          />
        ))}
        <div className="add-profile" onClick={handleAddProfile}>
          +
        </div>
      </div>
    </div>
  );
};

export default ProfileSelector;
