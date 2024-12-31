import React from "react";
import { DataContext } from "../App";

function Dropdown({ name, type, setType }) {
  const data = React.useContext(DataContext);

  function handleSelect(event, setType) {
    setType(event.target.value);
  }

  let currentData = data.male_run;

  if (name === "pushup") {
    currentData = data.male_pushup;
  } else if (name === "situp") {
    currentData = data.male_situp;
  }

  return (
    <select value={type} onChange={(event) => handleSelect(event, setType)}>
      {currentData &&
        Object.keys(currentData["1"]).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
    </select>
  );
}

export default Dropdown;
