import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import "./availability.css";
import LockedIn from "./LockedIn/LockedIn";
import ResponseForm from "../Availability/Response/Response";
import Weekly from "./Weekly/Weekly";

const Availability = () => {
  return (
    <>
      <div className="availability">
        <p>Select Your Availability Type</p>
        <TabView className="availability-tabview">
          <TabPanel header="Locked In">
            <LockedIn />
          </TabPanel>
          <TabPanel header="Weekly">
            <Weekly />
          </TabPanel>
        </TabView>
      </div>
      <ResponseForm />
    </>
  );
};

export default Availability;
