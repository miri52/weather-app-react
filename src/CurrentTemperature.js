import React, { useState } from "react";

export default function CurrentTemperature(props) {
  const [scale, setScale] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setScale("fahrenheit");
  }

  function fahrenheitTemperature() {
    return Math.round(props.celsiusTemperature * (9 / 5) + 32);
  }

  function showCelsius(event) {
    event.preventDefault();
    setScale("celsius");
  }

  if (scale === "celsius") {
    return (
      <div>
        <strong className="current-temperature">
          {props.celsiusTemperature}
        </strong>
        <span className="styled-scale">°C</span>
        <span> | </span>
        <a href="/" onClick={showFahrenheit} className="unstyled-scale">
          °F
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <strong className="current-temperature">
          {fahrenheitTemperature()}
        </strong>
        <a href="/" onClick={showCelsius} className="unstyled-scale">
          °C{" "}
        </a>
        <span> | </span>
        <span className="styled-scale">°F</span>
      </div>
    );
  }
}
