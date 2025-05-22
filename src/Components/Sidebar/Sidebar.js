import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="sidebar">
      <div className={`sidebar-item ${isActive("/home") ? "active" : ""}`}>
        <Link to="/home">Home</Link>
      </div>

      <div
        className={`sidebar-item ${isActive("/my-sessions") ? "active" : ""}`}
      >
        <Link to="/my-sessions">My Sessions</Link>
      </div>

      <div
        className={`sidebar-item ${isActive("/availability") ? "active" : ""}`}
      >
        <Link to="/availability">Availability</Link>
      </div>

      <div
        className={`sidebar-item ${isActive("/notifications") ? "active" : ""}`}
      >
        <Link to="/notifications">Notifications</Link>
      </div>

      <div className={`sidebar-item ${isActive("/profile") ? "active" : ""}`}>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Sidebar;
