import React, { useState, useRef } from "react";
import "./trainerslogin.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { useLogin } from "../../APIContext/LoginContext";
import { Toast } from "primereact/toast";
import Loader from "../../Components/Loader/Loader";

const TrainersLogin = () => {
  const { login, loading } = useLogin();
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username_or_email || !formData.password) {
      toastRef.current?.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please enter both email and password.",
        life: 3000,
      });
      return;
    }

    const result = await login(formData);
    if (result.success) {
      toastRef.current?.show({
        severity: "success",
        summary: "Login Successful",
        detail: "Redirecting...",
        life: 2000,
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <Toast ref={toastRef} />
      <div className="trainers-login">
        <div className="trainers-login-form">
          <h1>Trainers Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <input
                type="text"
                name="username_or_email"
                placeholder="Email Address"
                value={formData.username_or_email}
                onChange={handleChange}
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="forgot-password-container">
              <Link to="/forgotpassword" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="btn gold" disabled={loading}>
              {loading ? <Loader /> : "Login"}
            </button>
          </form>
          <hr />
          <div className="dha-element">
            <span>Don’t Have An Account? Create A New Account Here</span>
            <Link to="/trainers-create-account" className="btn black">
              Create Your New Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainersLogin;
