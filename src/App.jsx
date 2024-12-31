import React from "react";
import "./App.css";

import StationInput from "./components/StationInput";

export const DataContext = React.createContext();

function App() {
  const [pushup, setPushup] = React.useState(1);
  const [situp, setSitup] = React.useState(1);
  const [run, setRun] = React.useState("10:00");

  //fetch data
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fileNames = [
      "male_pushup",
      "male_situp",
      "male_run",
      "female_pushup",
      "female_situp",
      "female_run",
    ];

    async function runEffect(file) {
      const response = await fetch(`/data/${file}.json`);
      const json = await response.json();
      setData((current) => ({
        ...current,
        [file]: json,
      }));
    }
    fileNames.map((file) => runEffect(file));
  }, []);

  return (
    <>
      <h1>IPPTimizer</h1>
      <p>Optmize your IPPT Scores</p>
      <DataContext.Provider value={data}>
        {/* pushup */}
        <div className="container">
          <p>Pushup:</p>
          <StationInput name="pushup" type={pushup} setType={setPushup} />
        </div>
        {/* situp */}
        <div className="container">
          <p>Situp:</p>
          <StationInput name="situp" type={situp} setType={setSitup} />
        </div>
        {/* run */}
        <div className="container">
          <p>2.4km Run:</p>
          <StationInput name="run" type={run} setType={setRun} />
        </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
