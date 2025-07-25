import React, { useEffect } from "react";
import "./loader.css";

const Loader = ({ message = "Loading..." }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    };
  }, []);

  return (
    <div className="app-loader-overlay">
      <div className="app-loader-content">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loader;
