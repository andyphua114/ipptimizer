function Dropdown({ name, type, setType, setGender, serviceStatus }) {
  function handleSelect(event, setType) {
    const newType = event.target.value;
    setType(newType);

    if (name === "serviceStatus" && newType !== "Regular") {
      setGender("Male");
    }
  }

  let data;

  if (serviceStatus !== "Regular") {
    data = ["Male"];
  } else {
    data = ["Male", "Female"];
  }

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
