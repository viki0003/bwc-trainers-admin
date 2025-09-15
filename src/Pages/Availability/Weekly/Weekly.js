import React, { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useTrainerAvailability } from "../../../APIContext/TrainerAvailabilityContext";
import "./weekly.css";

const Weekly = () => {
  const { trainerWeeklyData, updateTrainerAvailabilityWeekly } = useTrainerAvailability();
  const weeklyData = trainerWeeklyData ?? [];

  const allSlots = [
    { start: "10:00:00", end: "12:00:00", label: "10:00 AM – 12:00 PM" },
    { start: "12:00:00", end: "02:00:00", label: "12:00 PM – 02:00 PM" },
    { start: "02:00:00", end: "04:00:00", label: "02:00 PM – 04:00 PM" },
    { start: "04:00:00", end: "06:00:00", label: "04:00 PM – 06:00 PM" },
  ];

  const [selectedSlots, setSelectedSlots] = useState({});
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, 1 = next week

  const KEY_SEP = "|";
  const makeKey = (date, start, end) => `${date}${KEY_SEP}${start}${KEY_SEP}${end}`;

  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const day = today.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + offset * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };

  const formatISODate = (date) => date.toLocaleDateString("en-CA");

  const formatRange = (dates) => {
    const fmt = (d) =>
      d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    return `${fmt(dates[0])} - ${fmt(dates[6])}`;
  };

  const currentWeekDates = getWeekDates(0);
  const nextWeekDates = getWeekDates(1);

  useEffect(() => {
    if (!weeklyData.length) return;
    const initial = {};
    weeklyData.forEach((slot) => {
      const key = makeKey(slot.date, slot.start_time, slot.end_time);
      initial[key] = true;
    });
    setSelectedSlots(initial);
  }, [weeklyData]);

  const onSlotChange = (date, start, end, checked) => {
    const key = makeKey(date, start, end);
    setSelectedSlots((prev) => ({ ...prev, [key]: checked }));
  };

  const handleUpdate = async () => {
    const updatedData = Object.entries(selectedSlots)
      .filter(([, isOn]) => isOn)
      .map(([key]) => {
        const [date, start, end] = key.split(KEY_SEP);
        return { date, start_time: start, end_time: end };
      });

    console.log("Updated Data to send:", updatedData);
    

    try {
      if (updateTrainerAvailabilityWeekly) {
        await updateTrainerAvailabilityWeekly(updatedData);
        alert("Weekly availability updated successfully!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update availability. Please try again.");
    }
  };

  const activeWeekDates = weekOffset === 0 ? currentWeekDates : nextWeekDates;

  return (
    <div className="locked-in">
      <div className="locked-in-content">
        <div className="locked-in-header">
          <p>Weekly Availability Selector</p>
        </div>

        <div className="locked-in-header-week">
          <span
            className={weekOffset === 0 ? "active-week" : ""}
            onClick={() => setWeekOffset(0)}
          >
            {formatRange(currentWeekDates)}
          </span>
          {(
            new Date().getDay() === 5 ||
            new Date().getDay() === 6 ||
            new Date().getDay() === 0) && (
            <span
              className={weekOffset === 1 ? "active-week" : ""}
              onClick={() => setWeekOffset(1)}
            >
              {formatRange(nextWeekDates)}
            </span>
          )}
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
               {activeWeekDates.map((dateObj, idx) => {
                  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
                  const dateStr = formatISODate(dateObj);

                  // For current week: show only slots that already exist
                  const slotsForDay = allSlots.filter((slot) =>
                    selectedSlots[makeKey(dateStr, slot.start, slot.end)]
                  );

                  // Decide what to render
                  const slotsToShow = weekOffset === 0 ? slotsForDay : allSlots;

                  // If current week and no slots exist for this day, skip rendering
                  if (weekOffset === 0 && slotsToShow.length === 0) {
                    return null;
                  }

                  return (
                    <tr className="day-row" key={idx}>
                      <td className="day-row-name">{dayName}</td>
                      <td className="day-row-slots">
                        <div className="checkbox-group">
                          {slotsToShow.map((slot, i) => {
                            const key = makeKey(dateStr, slot.start, slot.end);
                            const checked = !!selectedSlots[key];
                            return (
                              <div className="checkbox-group-item" key={i}>
                                <Checkbox
                                  inputId={key}
                                  value={key}
                                  onChange={(e) =>
                                    onSlotChange(dateStr, slot.start, slot.end, e.checked)
                                  }
                                  checked={checked}
                                  disabled={weekOffset === 0} // disable in current week
                                />
                                <label htmlFor={key}>{slot.label}</label>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="update-button-container">
          {weekOffset === 1 && (
            <button className="update-button" onClick={handleUpdate}>
              Update Availability
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weekly;
