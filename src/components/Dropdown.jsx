function Dropdown({ name, type, setType }) {
  function handleSelect(event, setType) {
    setType(event.target.value);
  }

  let data = ["Male", "Female"];

  if (name === "serviceStatus") {
    data = ["NSF", "NSman", "Regular"];
  } else if (name === "age") {
    data = [...Array(60 - 18 + 1).keys()].map((i) => i + 18);
  }

  return (
    <select value={type} onChange={(event) => handleSelect(event, setType)}>
      {data.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
