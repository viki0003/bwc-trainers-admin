import React, { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useTrainerAvailability } from "../../../APIContext/TrainerAvailabilityContext";
import "./lockedin.css";

const LockedIn = () => {
  const { trainerLockedData, updateTrainerAvailabilityLockedIn } = useTrainerAvailability();

  // Safe default to [] if API not ready
  const lockedData = trainerLockedData ?? [];

  // Map day index to names
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Define all possible slots
  const allSlots = [
    { start: "10:00:00", end: "12:00:00", label: "10:00 AM – 12:00 PM" },
    { start: "12:00:00", end: "02:00:00", label: "12:00 PM – 02:00 PM" },
    { start: "02:00:00", end: "04:00:00", label: "02:00 PM – 04:00 PM" },
    { start: "04:00:00", end: "06:00:00", label: "04:00 PM – 06:00 PM" },
  ];

  // State to store which slots are checked
  const [selectedSlots, setSelectedSlots] = useState({});

  // Initialize selected slots when trainerLockedData changes
  useEffect(() => {
    if (!lockedData.length) return;

    const initial = {};
    lockedData.forEach(slot => {
      const key = `${slot.day_of_week}-${slot.start_time}-${slot.end_time}`;
      initial[key] = true;
    });
    setSelectedSlots(initial);
  }, [lockedData]);

  // Handle checkbox change
  const onSlotChange = (dayIndex, start, end, checked) => {
    const key = `${dayIndex}-${start}-${end}`;
    setSelectedSlots(prev => ({
      ...prev,
      [key]: checked
    }));
  };


    // Handle Update button click
  const handleUpdate = async () => {
    const updatedData = [];

    Object.keys(selectedSlots).forEach((key) => {
      if (selectedSlots[key]) {
        const [dayIndex, start, end] = key.split("-");
        updatedData.push({
          day_of_week: parseInt(dayIndex, 10),
          start_time: start,
          end_time: end,
        });
      }
    });

    console.log("Updated Availability JSON:", updatedData);
    try {
      await updateTrainerAvailabilityLockedIn(updatedData);
      alert("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update availability. Please try again.");
    }

  };

  return (
    <div className="locked-in">
      <div className="locked-in-content">
        <div className="locked-in-header">
          <p>Weekly Availability Selector</p>
          <span>For Every Week</span>
        </div>

        <div className="locked-in-table">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day, dayIndex) => (
                <tr className="day-row" key={dayIndex}>
                  <td className="day-row-name">{day}</td>
                  <td className="day-row-slots">
                    <div className="checkbox-group">
                      {allSlots.map((slot, i) => {
                        const key = `${dayIndex}-${slot.start}-${slot.end}`;
                        const checked = !!selectedSlots[key];
                        return (
                          <div className="checkbox-group-item" key={i}>
                            <Checkbox
                              inputId={key}
                              value={key}
                              onChange={(e) =>
                                onSlotChange(dayIndex, slot.start, slot.end, e.checked)
                              }
                              checked={checked}
                            />
                            <label htmlFor={key}>{slot.label}</label>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

         <div className="update-button-container">
          <button className="update-button" onClick={handleUpdate}>Update Availability</button>
        </div>
      </div>
    </div>
  );
};

export default LockedIn;
