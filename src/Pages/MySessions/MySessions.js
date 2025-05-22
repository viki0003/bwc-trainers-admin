import React from "react";
import "./mysessions.css";

const MySessions = () => {
  return (
    <div className="trainer-session">
      <div className="trainer-management-table ">
        <div className="trainer-management-table-header">
          <div className="search-table">
            <div className="filterbtn">
              <input type="date" />
            </div>
            <div className="filterbtn">
              <select>
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="filterbtn">
              <select>
                <option value="All">Session Type</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="filterbtn">
              <select>
                <option value="All">Sports</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="trainer-management-table-body">
          <table>
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Sport</th>
                <th>Session Type</th>
                <th>Players</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MySessions;
