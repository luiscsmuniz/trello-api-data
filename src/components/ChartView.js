import React from "react";
import PercentageActivities from "./PercentageActivities";
import ActivitiesLabel from "./ActivitiesLabel";
import TimeActivities from "./TimeActivities";

const ChartView = ({ options, cards, labels }) => {
  if (options.chart === "percentage_activities") {
    return <PercentageActivities cards={cards} options={options} />;
  }

  if (options.chart === "activities_labels") {
    return <ActivitiesLabel cards={cards} options={options} labels={labels} />;
  }

  if (options.chart === "time_activities") {
    return <TimeActivities cards={cards} options={options} />;
  }

  return null;
};

export default ChartView;
