import React from "react";
import "./notifications.css";

const Notifications = () => {
  return (
    <div className="trainers-notifications">
      <div className="trainer-management-table ">
        <div className="trainer-management-table-header">
          <div className="search-table">
            <div className="filterbtn">
              <select>
                <option value="All">Type</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="filterbtn">
              <select>
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="block-cstm">
        <div className="bloc-item"></div>
        <div className="bloc-item"></div>
        <div className="bloc-item"></div>
        <div className="bloc-item"></div>
        <div className="bloc-item"></div>
        <div className="bloc-item"></div>
      </div>
    </div>
  );
};
export default Notifications;
