import React from "react";
import "./trainershome.css";

const TrainersHome = () => {
  return (
    <div className="trainers-home">
      <div className="trainers-block-list">
        <div className="trainers-block w-full">
          <h4>Today’s Sessions</h4>
          <div className="block-cstm">
            <div className="bloc-item"></div>
            <div className="bloc-item"></div>
            <div className="bloc-item"></div>
          </div>
          <button className="btn black">View All Sessions</button>
        </div>
        <div className="trainers-block">
          <h4>Your Availability</h4>
          <div className="block-cstm">
            <div className="bloc-item"></div>
            <div className="bloc-item"></div>
            <div className="bloc-item"></div>
          </div>
        </div>
        <div className="trainers-block">
          <h4>Notifications</h4>
          <div className="block-cstm">
            <div className="bloc-item"></div>
            <div className="bloc-item"></div>
            <div className="bloc-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrainersHome;
