import React from "react";
import "./Profile.css"
import {useNavigate} from 'react-router-dom'

const Card = ({
profile,
isEditing,
newName,
setNewName,
onEdit,
onSave,
onDelete,
}) => {

    const navigate=useNavigate()
return (
    <div className="profile-card" onClick={()=>navigate("/main")}>
    {isEditing ? (
        <>
        <input
            type="text" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="edit-input"
        />
        <button className="save-button" onClick={() => {
            console.log("Save button clicked");
            onSave();
        }}>
            저장
        </button>
        </>
    ) : (
        <>
        <img src={profile.image} alt={profile.name} className="profile-image" />
        <p className="profile-name">{profile.name}</p>
        <div className="profile-actions">
            <button
            className="edit-button"
            onClick={() => {
                console.log("Edit button clicked");
                onEdit();
            }}
            >
            수정
            </button>
            <button
            className="delete-button"
            onClick={() => {
                console.log("Delete button clicked");
                onDelete();
            }}
            >
            삭제
            </button>
        </div>
        </>
    )}
    </div>
);
};

export default Card;
