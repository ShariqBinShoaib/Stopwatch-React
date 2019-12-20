import React from "react";
import "./styleSheets/Timer.css";

function Timer({ data, label }) {
  return (
    <div className="timer">
      <p className="timer-label">{label}</p>
      <div className="timer-container">
        <span className="timer-value">{data}</span>
      </div>
    </div>
  );
}

export default Timer;
