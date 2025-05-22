import React, { useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import "./profile.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef();

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="trainers-profile">
      <div className="profile-form">
        <div className="profile-section">
          <div className="profile-container">
            <div className="profile-photo">
              <div className="photo-box">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-img"
                  />
                )}
              </div>
              <button className="edit-photo" onClick={handlePhotoClick}>
                <FaPencilAlt />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>
            <div className="profile-fields">
              <div className="row">
                <ProfileField label="Name" />
                <ProfileField label="Contact Number" />
              </div>
              <div className="row">
                <ProfileField label="Email" />
                <ProfileField label="Sports Specialty" />
              </div>
              <ProfileField label="Your Address" full />
              <div className="row">
                <ProfileField label="Date of Birth" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, full }) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className={`field-group ${full ? "full" : ""}`}>
      <label>{label}</label>
      <div className="field-input">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!editable}
        />
        <button
          className="edit-icon"
          onClick={() => setEditable(!editable)}
          type="button"
        >
          <FaPencilAlt />
        </button>
      </div>
    </div>
  );
};
export default Profile;
