import React, { useEffect, useState } from "react";
import { useTrainerAvailability } from "../../../APIContext/TrainerAvailabilityContext";
import "./response.css";

const RequestTimeOffForm = () => {
  const { trainerTimeOffData, updateTrainerTimeOff } = useTrainerAvailability();

  const [formData, setFormData] = useState({
    from_date: "",
    to_date: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    if (trainerTimeOffData) {
      setFormData({
        from_date: trainerTimeOffData[0].from_date || "",
        to_date: trainerTimeOffData[0].to_date || "",
        reason: trainerTimeOffData[0].reason || "",
      });
    }
  }, [trainerTimeOffData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.from_date) newErrors.from_date = "From Date is required";
    if (!formData.to_date) newErrors.to_date = "To Date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
   

    try {
      await updateTrainerTimeOff(formData);
      alert("Time-off request submitted successfully!");
    }catch{
      alert("Failed to submit time-off request. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="title">Request Time Off</h2>
        <div className="form-content">
          <div className="left-side">
            <div className="input-group">
              <label>From Date:</label>
              <input
                type="date"
                name="from_date"
                value={formData.from_date}
                onChange={handleChange}
                required
                aria-invalid={errors.from_date ? "true" : "false"}
              />
              {errors.from_date && (
                <span className="error">{errors.from_date}</span>
              )}
            </div>
            <div className="input-group">
              <label>To Date:</label>
              <input
                type="date"
                name="to_date"
                value={formData.to_date}
                onChange={handleChange}
                required
                aria-invalid={errors.to_date ? "true" : "false"}
              />
              {errors.to_date && <span className="error">{errors.to_date}</span>}
            </div>
          </div>
          <div className="right-side">
            <label>Reason:</label>
            <textarea
              rows="5"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              aria-invalid={errors.reason ? "true" : "false"}
            />
            {errors.reason && <span className="error">{errors.reason}</span>}
          </div>
        </div>
        <div className="button-wrapper">
          <button className="submit-button" onClick={handleSubmit}>
            Request Time-Off
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestTimeOffForm;
