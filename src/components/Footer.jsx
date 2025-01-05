import React from "react";
import { ScoreContext } from "../App";

function Footer({ elite, serviceStatus }) {
  const { pushupScore, situpScore, runScore } = React.useContext(ScoreContext);
  const totalScore = pushupScore + situpScore + runScore;

  const gold = elite ? 90 : 85;
  const silver = 75;

  const pass_with_incentive = 61;
  let pass = 61;

  if (serviceStatus === "NSman") {
    pass = 51;
  }

  let award = "Fail";

  if (pushupScore === 0 || situpScore === 0 || runScore === 0) {
    return (
      <p>
        <strong>{"Fail"}</strong>
      </p>
    );
  }

  if (totalScore >= gold) {
    award = "Gold";
  } else if (totalScore >= silver) {
    award = "Silver";
  } else if (totalScore >= pass_with_incentive && serviceStatus === "NSman") {
    award = "Pass with Incentive";
  } else if (totalScore >= pass) {
    award = "Pass";
  } else {
    award = "Fail";
  }

  return (
    <p>
      <strong>
        {award}: {totalScore} points
      </strong>
    </p>
  );
}

export default Footer;
