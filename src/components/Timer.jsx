import React from "react";
import "./styleSheets/Timer.css";
import { CSSTransition } from "react-transition-group";

function Timer({ data, label }) {
  return (
    <div className="timer">
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="timer-label-container"
      >
        <div className="timer-label-container">
          <p className="timer-label">{label}</p>
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames="timer-container"
          >
            <div className="timer-container">
              <span className="timer-value">{data}</span>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Timer;
