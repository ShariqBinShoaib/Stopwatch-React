import React, { Component } from "react";
import Timer from "./Timer";
import "./styleSheets/Stopwatch.css";
import { setInterval, clearInterval } from "timers";

class Stopwatch extends Component {
  state = {
    timers: [],
    isRunning: false,
    secondsNotRendered: true,
    minutesNotRendered: true
  };

  miliSeconds = {
    label: "Miliseconds",
    time: 0
  };
  seconds = {
    label: "Seconds",
    time: 0
  };
  minutes = {
    label: "Minutes",
    time: 0
  };

  componentDidMount() {
    this.setState({ timers: [this.miliSeconds] });
  }

  handleStart = () => {
    let { timers } = this.state,
      index = timers.findIndex(timer => timer.label === "Miliseconds"),
      miliSeconds = timers[index].time;
    if (this.state.isRunning) {
      alert("Stopwatch is already running.");
    } else {
      this.setState({ isRunning: true });
      this.referenceInterval = setInterval(() => {
        miliSeconds += 4;
        timers = [...this.state.timers];
        index = timers.findIndex(timer => timer.label === "Miliseconds");
        timers[index].time = miliSeconds;
        this.setState({ timers });
        if (miliSeconds === 1000) {
          if (this.state.secondsNotRendered) {
            timers = [this.seconds, ...this.state.timers];
            this.setState({ timers, secondsNotRendered: false });
          }
          timers = [...this.state.timers];
          index = timers.findIndex(timer => timer.label === "Seconds");
          var seconds = timers[index].time;
          seconds++;
          miliSeconds = 0;
          timers[index].time = seconds;
          index = timers.findIndex(timer => timer.label === "Miliseconds");
          timers[index].time = miliSeconds;
          this.setState({ timers });
        }
        if (seconds === 60) {
          if (this.state.minutesNotRendered) {
            timers = [this.minutes, ...this.state.timers];
            this.setState({ timers, minutesNotRendered: false });
          }
          timers = [...this.state.timers];
          index = timers.findIndex(timer => timer.label === "Minutes");
          var minutes = timers[index].time;
          minutes++;
          seconds = 0;
          miliSeconds = 0;
          timers[index].time = minutes;
          index = timers.findIndex(timer => timer.label === "Seconds");
          timers[index].time = seconds;
          index = timers.findIndex(timer => timer.label === "Miliseconds");
          timers[index].time = miliSeconds;
          this.setState({ timers });
        }
      }, 1);
    }
  };

  handleStop = () => {
    clearInterval(this.referenceInterval);
    this.setState({ isRunning: false });
  };

  handleReset = () => {
    clearInterval(this.referenceInterval);
    this.miliSeconds.time = 0;
    this.seconds.time = 0;
    this.minutes.time = 0;
    this.setState({
      timers: [this.miliSeconds],
      isRunning: false,
      secondsNotRendered: true,
      minutesNotRendered: true
    });
  };

  render() {
    const { timers, isRunning } = this.state;
    return (
      <React.Fragment>
          <div className="timers">
            {timers.map(timer => (
              <Timer key={timer.label} data={timer.time} label={timer.label} />
            ))}
          </div>
        <div className="btn-container">
          <button
            onClick={isRunning ? this.handleStop : this.handleStart}
            className={isRunning ? "btn stop-btn" : "btn start-btn"}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button onClick={this.handleReset} className="btn reset-btn">
            Reset
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Stopwatch;
