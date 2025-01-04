import React from "react";
import { DataContext } from "../App";

function StationButton({ name, action, type, setType, children }) {
  const data = React.useContext(DataContext);

  function handleAddMinus(action) {
    const current = type;

    if (name === "run") {
      const runTimings = Object.keys(data.male_run["1"]);
      const currentIndex = runTimings.indexOf(type);

      if (action == "add" && current !== "18:20") {
        const newTiming = runTimings[currentIndex + 1];
        setType(newTiming);
      } else if (action == "minus" && current !== "8:30") {
        const newTiming = runTimings[currentIndex - 1];
        setType(newTiming);
      }
    } else {
      if (action === "add" && current < 60) {
        setType((currentValue) => Number(currentValue) + 1);
      } else if (action === "minus" && current > 1) {
        setType((currentValue) => Number(currentValue) - 1);
      }
    }
  }
  return (
    <>
      <button onClick={() => handleAddMinus(action)}>{children}</button>
    </>
  );
}

export default StationButton;
