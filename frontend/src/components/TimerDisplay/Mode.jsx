import React from "react";

const Mode = ({ mode }) => {
  let modeText = mode === "pomodoro" ? "Time to focus!" : "Time to take a break!";
  return <h1 className="pomodoro-mode">{modeText}</h1>;
};

export default Mode;
