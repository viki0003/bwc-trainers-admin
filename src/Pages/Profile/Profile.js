import React, { useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useTrainerAccounts } from "../../APIContext/TrainerAccountContext";
import defaultImage from "../../Assets/Images/avtar.jpg";
import "./profile.css";

const Profile = () => {
  const { trainer, updateTrainer, fetchTrainer } = useTrainerAccounts();
  const fileInputRef = useRef();

  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    sports: "",
    address: "",
    date_of_birth: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    if (trainer && trainer.user) {
      const sports = (trainer.sports || []).map((s) => s.name).join(", ");
      const initialData = {
        first_name: trainer.user.first_name || "",
        last_name: trainer.user.last_name || "",
        email: trainer.user.email || "",
        phone: trainer.phone || "",
        sports,
        address: trainer.address || "",
        date_of_birth: trainer.date_of_birth || "",
      };

      setFields(initialData);
      setOriginalData(initialData);
      setEditableFields({});
      setIsEditing(false);

      setProfileImage(trainer.image || null);
    }
  }, [trainer]);

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setImageFile(file);
      setIsEditing(true);
    }
  };

  const handleFieldEdit = (key) => {
    setEditableFields((prev) => ({ ...prev, [key]: true }));
    setIsEditing(true);
  };

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("first_name", fields.first_name || "");
    formData.append("last_name", fields.last_name || "");
    formData.append("phone", fields.phone || "");
    formData.append("address", fields.address || "");
    formData.append("date_of_birth", fields.date_of_birth || "");
    formData.append("email", fields.email || "");

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await updateTrainer(formData);
      await fetchTrainer(); // ensures we get fresh trainer data

      alert("Profile updated successfully!");
      setEditableFields({});
      setIsEditing(false);
      setImageFile(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile.");
    }
  };

  const handleCancel = () => {
    setFields(originalData);
    setEditableFields({});
    setIsEditing(false);
    setProfileImage(trainer?.image || null);
    setImageFile(null);
  };

  return (
    <div className="trainers-profile">
      <div className="profile-form">
        <div className="profile-section">
          <div className="profile-container">
            <div className="profile-photo">
              <div className="photo-box">
                <img
                  src={profileImage || defaultImage}
                  alt="Profile"
                  className="profile-img"
                />
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
                <ProfileField
                  label="First Name"
                  fieldKey="first_name"
                  value={fields.first_name}
                  editable={editableFields.first_name}
                  onEdit={handleFieldEdit}
                  onChange={handleFieldChange}
                />
                <ProfileField
                  label="Last Name"
                  fieldKey="last_name"
                  value={fields.last_name}
                  editable={editableFields.last_name}
                  onEdit={handleFieldEdit}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="row">
                <ProfileField
                  label="Email"
                  fieldKey="email"
                  value={fields.email}
                  disabled={true}
                />
                <ProfileField
                  label="Contact Number"
                  fieldKey="phone"
                  value={fields.phone}
                  editable={editableFields.phone}
                  onEdit={handleFieldEdit}
                  onChange={handleFieldChange}
                />
              </div>
              <ProfileField
                label="Sports Specialty"
                fieldKey="sports"
                value={fields.sports}
                disabled
                full
              />
              <ProfileField
                label="Your Address"
                fieldKey="address"
                value={fields.address}
                editable={editableFields.address}
                onEdit={handleFieldEdit}
                onChange={handleFieldChange}
                full
              />
              <div className="row">
                <ProfileField
                  label="Date of Birth"
                  fieldKey="date_of_birth"
                  value={fields.date_of_birth}
                  editable={editableFields.date_of_birth}
                  onEdit={handleFieldEdit}
                  onChange={handleFieldChange}
                />
              </div>

              {isEditing && (
                <div className="action-buttons">
                  <button className="btn black" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="btn gray" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  fieldKey,
  value,
  editable,
  onEdit,
  onChange,
  disabled = false,
  full,
}) => {
  const handleEditClick = () => {
    if (!disabled) onEdit(fieldKey);
  };

  return (
    <div className={`field-group ${full ? "full" : ""}`}>
      <label>{label}</label>
      <div className="field-input">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(fieldKey, e.target.value)}
          disabled={disabled || !editable}
        />
        {!disabled && (
          <button className="edit-icon" type="button" onClick={handleEditClick}>
            <FaPencilAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
