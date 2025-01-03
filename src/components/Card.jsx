import React from "react";
import { DataContext } from "../App";
import { ScoreContext } from "../App";

import { findNext } from "../utils/helper";
import { findNextTiming } from "../utils/helper";

function Card({ age, gender, elite, serviceStatus, stationOptimize, award }) {
  const data = React.useContext(DataContext);
  const { pushupScore, situpScore, runScore } = React.useContext(ScoreContext);

  const currentTotal = pushupScore + situpScore + runScore;

  let nextRep;

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

    if (stationOptimize === "2.4km Run") {
      nextRep = findNextTiming(data[dataOptimize][age_cat])[requiredPoints];
      if (!nextRep) {
        nextRep = findNextTiming(data[dataOptimize][age_cat])[
          requiredPoints + 1
        ];
      }
    } else {
      nextRep = findNext(data[dataOptimize][age_cat])[requiredPoints];
      if (!nextRep) {
        nextRep = findNext(data[dataOptimize][age_cat])[requiredPoints + 1];
      }
    }

    console.log(findNextTiming(data[dataOptimize][age_cat]));
    console.log(nextRep ? nextRep : "Not able to...");
  }

  return (
    <>
      <p>{nextRep ? nextRep : "Not able to..."}</p>
    </>
  );
}

export default Card;
