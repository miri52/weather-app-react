import React from "react";

export default function FormattedDate(props) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[props.date.getDay()];
  let hours = props.date.getHours();
  let minutes =
    (props.date.getMinutes() < 10 ? "0" : "") + props.date.getMinutes();
  return (
    <div className="FormattedDate">
      Last updated: {day} {hours}:{minutes}
    </div>
  );
}
