import React, { useState } from "react";
import "./response.css";

const RequestTimeOffForm = () => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fromDate) newErrors.fromDate = "From Date is required";
    if (!formData.toDate) newErrors.toDate = "To Date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Handle successful form submission (e.g., API call or console log for demo)
    console.log("Form submitted:", formData);
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
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
                aria-invalid={errors.fromDate ? "true" : "false"}
              />
              {errors.fromDate && (
                <span className="error">{errors.fromDate}</span>
              )}
            </div>
            <div className="input-group">
              <label>To Date:</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
                aria-invalid={errors.toDate ? "true" : "false"}
              />
              {errors.toDate && <span className="error">{errors.toDate}</span>}
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
