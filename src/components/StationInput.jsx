import Dropdown from "./StationDropdown";
import Button from "./StationButton";

function StationInput({ name, type, setType }) {
  if (name === "run") {
    return (
      <>
        <Button name={name} action="minus" type={type} setType={setType}>
          -10 sec
        </Button>
        <Dropdown name={name} type={type} setType={setType} />
        <Button name={name} action="add" type={type} setType={setType}>
          +10 sec
        </Button>
      </>
    );
  }

  return (
    <>
      <Button name={name} action="minus" type={type} setType={setType}>
        -1
      </Button>
      <Dropdown name={name} type={type} setType={setType} />
      <Button name={name} action="add" type={type} setType={setType}>
        +1
      </Button>
    </>
  );
}

export default StationInput;
