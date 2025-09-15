import React, { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { useTrainerAvailability } from "../../../APIContext/TrainerAvailabilityContext";
import "./weekly.css";

const Weekly = () => {
  const { trainerWeeklyData, updateTrainerAvailabilityWeekly } = useTrainerAvailability();

  const weeklyData = trainerWeeklyData ?? [];

  // All possible slots
  const allSlots = [
    { start: "10:00:00", end: "12:00:00", label: "10:00 AM – 12:00 PM" },
    { start: "12:00:00", end: "02:00:00", label: "12:00 PM – 02:00 PM" },
    { start: "02:00:00", end: "04:00:00", label: "02:00 PM – 04:00 PM" },
    { start: "04:00:00", end: "06:00:00", label: "04:00 PM – 06:00 PM" },
  ];

  const [selectedSlots, setSelectedSlots] = useState({});

  // ---- helpers ----
  const KEY_SEP = "|";
  const makeKey = (date, start, end) => `${date}${KEY_SEP}${start}${KEY_SEP}${end}`;

  // Current week Mon→Sun
  const getCurrentWeekDates = () => {
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 1=Mon
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  };

  const currentWeekDates = getCurrentWeekDates();

  // Local YYYY-MM-DD
  const formatISODate = (date) => date.toLocaleDateString("en-CA");

  // Week range string
  const weekRangeString = (() => {
    const fmt = (d) =>
      d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    return `${fmt(currentWeekDates[0])} - ${fmt(currentWeekDates[6])}`;
  })();

  const nextWeekRangeString = (() => {
  const fmt = (d) =>
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const nextWeekDates = currentWeekDates.map(
    (d) => new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000)
  );
  return `${fmt(nextWeekDates[0])} - ${fmt(nextWeekDates[6])}`;
})();

  // Initialize selected from backend
  useEffect(() => {
    if (!weeklyData.length) return;
    const initial = {};
    weeklyData.forEach((slot) => {
      const key = makeKey(slot.date, slot.start_time, slot.end_time);
      initial[key] = true;
    });
    setSelectedSlots(initial);
  }, [weeklyData]);

  // Checkbox change
  const onSlotChange = (date, start, end, checked) => {
    const key = makeKey(date, start, end);
    setSelectedSlots((prev) => ({ ...prev, [key]: checked }));
  };

  // Build JSON and (optionally) send
  const handleUpdate = async () => {
    const updatedData = Object.entries(selectedSlots)
      .filter(([, isOn]) => isOn)
      .map(([key]) => {
        const [date, start, end] = key.split(KEY_SEP);
        return { date, start_time: start, end_time: end };
      });

    console.log("Updated Weekly Availability JSON:", updatedData);

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

  return (
    <div className="locked-in">
      <div className="locked-in-content">
        <div className="locked-in-header">
          <p>Weekly Availability Selector</p>
        </div>
        <div className="locked-in-header-week">
          <span>{weekRangeString}</span>
          {(new Date().getDay() === 5 ||
            new Date().getDay() === 6 ||
            new Date().getDay() === 0) && (
            <span>{nextWeekRangeString}</span>
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
              {currentWeekDates.map((dateObj, idx) => {
                const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
                const dateStr = formatISODate(dateObj);

                return (
                  <tr className="day-row" key={idx}>
                    <td className="day-row-name">{dayName}</td>
                    <td className="day-row-slots">
                      <div className="checkbox-group">
                        {allSlots.map((slot, i) => {
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
          <button className="update-button" onClick={handleUpdate}>
            Update Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default Weekly;
