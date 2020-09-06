import React, { useContext } from "react";
import cookie from "js-cookie";

const JumboTron = (props) => {
  let currSum = props.currentSum.toFixed(2);
  let maxSum = cookie.get("max_calorie");
  const percentage = ((currSum / maxSum) * 100).toFixed(2);
  let color = "";
  if (percentage > 85) {
    color = "bg-danger";
  } else if (percentage > 70) {
    color = "bg-warning";
  }
  return (
    <div className='jumbotron text-center'>
      <h1>Calorie Intake: {` ${currSum} / ${maxSum} `}</h1>
      <div className='container myprogress'>
        <div className='progress' style={{ height: "40px" }}>
          <div
            className={`progress-bar ${color}`}
            role='progressbar'
            style={{ width: `${percentage}%` }}
          >
            {`${percentage}%`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumboTron;
