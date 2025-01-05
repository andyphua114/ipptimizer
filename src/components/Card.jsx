import React from "react";
import "./Card.css";
import { DataContext } from "../App";
import { ScoreContext } from "../App";
import { RepContext } from "../App";

import { findNextCard } from "../utils/helper";

function Card({ age, gender, elite, serviceStatus, stationOptimize, award }) {
  const data = React.useContext(DataContext);
  const { pushupScore, situpScore, runScore } = React.useContext(ScoreContext);
  const { pushup, situp, run } = React.useContext(RepContext);

  const [nextRep, setNextRep] = React.useState("");

  const currentTotal = pushupScore + situpScore + runScore;

  React.useEffect(() => {
    if (Object.keys(data).length === 7) {
      const age_cat = data["age_band"][age];

      const gold = elite ? 90 : 85;
      const silver = 75;
      const pass_with_incentive = 61;
      const pass = serviceStatus === "NSman" ? 51 : 61;

      let currentPoints;

      let dataOptimize = gender === "Male" ? "male_" : "female_";

      if (stationOptimize === "2.4km Run") {
        dataOptimize = `${dataOptimize}run`;
        currentPoints = currentTotal - runScore;
      } else if (stationOptimize === "Pushup") {
        dataOptimize = `${dataOptimize}pushup`;
        currentPoints = currentTotal - pushupScore;
      } else {
        dataOptimize = `${dataOptimize}situp`;
        currentPoints = currentTotal - situpScore;
      }

      let requiredPoints;
      if (award === "Gold") {
        requiredPoints = gold - currentPoints;
      } else if (award === "Silver") {
        requiredPoints = silver - currentPoints;
      } else if (award === "Pass") {
        requiredPoints = pass - currentPoints;
      } else {
        requiredPoints = pass_with_incentive - currentPoints;
      }

      let nextRepTemp;
      if (requiredPoints <= 0) {
        nextRepTemp = Object.keys(data[dataOptimize][age_cat]).find(
          (k) => data[dataOptimize][age_cat][k] === 1
        );
      } else {
        nextRepTemp = findNextCard(
          data[dataOptimize][age_cat],
          requiredPoints,
          stationOptimize
        );
      }

      setNextRep(nextRepTemp);
    }
  }, [
    data,
    age,
    gender,
    elite,
    serviceStatus,
    stationOptimize,
    award,
    pushupScore,
    situpScore,
    runScore,
    currentTotal,
  ]);

  const awardClass = award.replace(/\s/g, "").toLowerCase();

  return (
    <div className={`card ${awardClass}`}>
      <p>
        <strong>{award}</strong>
      </p>
      <p>
        Pushup:{" "}
        {stationOptimize === "Pushup"
          ? nextRep
            ? nextRep
            : "Not possible"
          : pushup}
      </p>
      <p>
        Situp:{" "}
        {stationOptimize === "Situp"
          ? nextRep
            ? nextRep
            : "Not possible"
          : situp}
      </p>
      <p>
        2.4km Run:{" "}
        {stationOptimize === "2.4km Run"
          ? nextRep
            ? nextRep
            : "Not possible"
          : run}
      </p>
    </div>
  );
}

export default Card;
