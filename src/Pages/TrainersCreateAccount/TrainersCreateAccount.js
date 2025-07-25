import React, { useRef, useState } from "react";
import "../TrainersLogin/trainerslogin.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { useTrainerAccounts } from "../../APIContext/TrainerAccountContext";
import { Toast } from "primereact/toast";
import Loader from "../../Components/Loader/Loader";

const TrainersCreateAccount = () => {
  const { createTrainer } = useTrainerAccounts();
  const toastRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    date_of_birth: "",
    address: "",
    bio: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please fill all required fields",
        life: 3000,
      });
      return;
    }

    setLoading(true);

    // Prepare payload
    const payload = {
      ...formData,
      sports: [],
    };

    // Remove empty optional fields to avoid backend blank field errors
    if (!payload.address?.trim()) delete payload.address;
    if (!payload.bio?.trim()) delete payload.bio;

    try {
      await createTrainer(payload);

      toastRef.current?.show({
        severity: "success",
        summary: "Account Created",
        detail: "Redirecting to login...",
        life: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toastRef.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to create trainer account.",
        life: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Toast ref={toastRef} />
      <div className="trainers-login tca-com">
        <div className="trainers-login-form">
          <h1>Create Your Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-item col-1">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-item col-1">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-item">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                name="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-item">
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-item">
              <input
                type="date"
                name="date_of_birth"
                placeholder="Date of Birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            {/* Optional fields if you want to use them in UI */}
            {/* 
            <div className="form-item">
              <input
                type="text"
                name="address"
                placeholder="Address (optional)"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-item">
              <textarea
                name="bio"
                placeholder="Bio (optional)"
                value={formData.bio}
                onChange={handleChange}
              />
            </div> 
            */}

            <button type="submit" className="btn gold" disabled={loading}>
              {loading ? <Loader /> : "Create Your Account"}
            </button>
          </form>
          <hr />
          <div className="dha-element">
            <span>Already Have An Account?</span>
            <Link to="/" className="btn black">
              Log in to Your Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainersCreateAccount;
