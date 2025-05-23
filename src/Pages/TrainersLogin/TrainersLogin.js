import React from "react";
import "./trainerslogin.css";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";

const TrainersLogin = () => {
  return (
    <>
      <Header />
      <div className="trainers-login">
        <div className="trainers-login-form">
          <h1>Trainers Login</h1>
          <form>
            <div className="form-item">
              <input type="text" placeholder="Email Address" />
            </div>
            <div className="form-item">
              <input type="password" placeholder="Password" />
            </div>
            <div className="forgot-password-container">
              <Link to="/forgotpassword" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="btn gold">
              Login
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
