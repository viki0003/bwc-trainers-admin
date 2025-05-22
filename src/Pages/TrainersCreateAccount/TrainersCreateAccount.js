import React from "react";
import "../TrainersLogin/trainerslogin.css";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";

const TrainersCreateAccount = () => {
  return (
    <>
      <Header />
      <div className="trainers-login tca-com">
        <div className="trainers-login-form">
          <h1>Create Your Account</h1>
          <form>
            <div className="form-item col-1">
              <input type="text" placeholder="First Name" />
            </div>
            <div className="form-item col-1">
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="form-item">
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="form-item">
              <input type="tel" placeholder="Mobile Number" />
            </div>
            <div className="form-item">
              <input type="text" placeholder="Date of Birth" />
            </div>
           
            <button type="submit" className="btn gold">
              Create Your Account
            </button>
          </form>
          <hr />
          <div className="dha-element">
            <span>Already Have An Account?</span>
            <Link to="/trainersregister" className="btn black">
              Log in to Your Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default TrainersCreateAccount;
