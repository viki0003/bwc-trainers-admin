import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import "./header.css";
import logo from "../../Assets/Images/BWC-Logo.png";
import SidebarUI from "../Sidebar/Sidebar";

const Header = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="Logo" className="logo" />
          <span>BWC Sports Trainers</span>
        </div>
        <div className="hamburger-btn">
          <label className="switch" onClick={() => setVisibleLeft(true)}>
            <input type="checkbox" />
            <span className="wrapper">
              <span className="row">
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
              <span className="row row-bottom">
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
              <span className="row-vertical">
                <span className="dot"></span>
                <span className="dot middle-dot"></span>
                <span className="dot"></span>
              </span>
              <span className="row-horizontal">
                <span className="dot"></span>
                <span className="dot middle-dot-horizontal"></span>
                <span className="dot"></span>
              </span>
            </span>
          </label>
        </div>
      </header>
      <Sidebar
        header="BWC Admin"
        visible={visibleLeft}
        position="left"
        onHide={() => setVisibleLeft(false)}
      >
        <SidebarUI />
      </Sidebar>
    </>
  );
};
export default Header;
