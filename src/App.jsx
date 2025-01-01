import React from "react";
import "./App.css";

import StationInput from "./components/StationInput";
import Dropdown from "./components/Dropdown";
import Footer from "./components/Footer";

export const DataContext = React.createContext();
export const ScoreContext = React.createContext();

function App() {
  const [pushup, setPushup] = React.useState(40);
  const [situp, setSitup] = React.useState(40);
  const [run, setRun] = React.useState("12:30");

  const [pushupScore, setPushupScore] = React.useState(20);
  const [situpScore, setSitupScore] = React.useState(20);
  const [runScore, setRunScore] = React.useState(34);

  const [age, setAge] = React.useState(30);
  const [serviceStatus, setServiceStatus] = React.useState("NSman");
  const [gender, setGender] = React.useState("Male");

  const [elite, setElite] = React.useState(false);

  const [stationOptimize, setStationOptimize] = React.useState("2.4km Run");

  //fetch data
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    let ignore = false;
    const fileNames = [
      "male_pushup",
      "male_situp",
      "male_run",
      "female_pushup",
      "female_situp",
      "female_run",
      "age_band",
    ];

    async function runEffect(file) {
      const response = await fetch(`/data/${file}.json`);
      const json = await response.json();
      if (!ignore) {
        setData((current) => ({
          ...current,
          [file]: json,
        }));
      }
    }
    fileNames.map((file) => runEffect(file));

    return () => {
      ignore = true;
    };
  }, []);

  // logic for points calculation
  // need to wait for all data to be loaded

  React.useEffect(() => {
    if (Object.keys(data).length === 7) {
      const age_cat = data["age_band"][age];

      gender === "Male"
        ? setPushupScore(data["male_pushup"][age_cat][pushup])
        : setPushupScore(data["female_pushup"][age_cat][pushup]);

      gender === "Male"
        ? setSitupScore(data["male_situp"][age_cat][situp])
        : setSitupScore(data["female_situp"][age_cat][situp]);

      gender === "Male"
        ? setRunScore(data["male_run"][age_cat][run])
        : setRunScore(data["female_run"][age_cat][run]);
    }
  }, [data, pushup, situp, run, age, gender]);

  const score = {
    pushupScore,
    situpScore,
    runScore,
  };

  const station = ["2.4km Run", "Pushup", "Situp"];

  return (
    <>
      <h1>IPPTimizer</h1>
      <p>Optmize your IPPT Scores</p>
      <DataContext.Provider value={data}>
        <ScoreContext.Provider value={score}>
          <div>
            <Dropdown
              name={"serviceStatus"}
              type={serviceStatus}
              setType={setServiceStatus}
            />
            <Dropdown name={"gender"} type={gender} setType={setGender} />
            <Dropdown name={"age"} type={age} setType={setAge} />
            {/* elite checkbox */}
            <input
              type="checkbox"
              id="elite-checkbox"
              checked={elite}
              onChange={(event) => {
                setElite(event.target.checked);
              }}
            />
            <label htmlFor={"elite-checkbox"}>Commando/Diver/Guards</label>
          </div>
          {/* Radio button for optimize */}
          {station.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name="current-station"
                id={option}
                value={option}
                checked={option === stationOptimize}
                onChange={(event) => {
                  setStationOptimize(event.target.value);
                }}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
          {/* pushup */}
          <div className="container">
            <p>Pushup:</p>
            <StationInput name="pushup" type={pushup} setType={setPushup} />
            <p>{pushupScore}</p>
          </div>
          {/* situp */}
          <div className="container">
            <p>Situp:</p>
            <StationInput name="situp" type={situp} setType={setSitup} />
            <p>{situpScore}</p>
          </div>
          {/* run */}
          <div className="container">
            <p>2.4km Run:</p>
            <StationInput name="run" type={run} setType={setRun} />
            <p>{runScore}</p>
          </div>
          <Footer elite={elite} serviceStatus={serviceStatus} />
        </ScoreContext.Provider>
      </DataContext.Provider>
    </>
  );
}

export default App;
