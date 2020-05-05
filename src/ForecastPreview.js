import React from "react";

export default function ForecastPreview(props) {
  function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return `${hours}:${minutes}`;
  }
  function icon() {
    return `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`;
  }

  return (
    <div className="ForecastPreview col-2">
      <h3 className="time">{formatHours(props.data.dt * 1000)}</h3>
      <img
        className="weather-icons"
        src={icon()}
        alt={props.data.weather[0].description}
      />
      <div className="temperature">
        <span className="max-temperature">
          {Math.round(props.data.main.temp_max)}°
        </span>
        <span className="min-temperature">
          {" "}
          {Math.round(props.data.main.temp_min)}°
        </span>
      </div>
    </div>
  );
}
