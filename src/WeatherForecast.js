import React, { useState } from "react";
import axios from "axios";
import ForecastPreview from "./ForecastPreview";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forecast, setForecast] = useState("");

  function showForecast(response) {
    setForecast(response.data);
    setIsSubmitted(true);
  }

  if (isSubmitted && props.city === forecast.city.name) {
    return (
      <div className="WeatherForecast row" id="forecast">
        <ForecastPreview data={forecast.list[0]} />
        <ForecastPreview data={forecast.list[1]} />
        <ForecastPreview data={forecast.list[2]} />
        <ForecastPreview data={forecast.list[3]} />
        <ForecastPreview data={forecast.list[4]} />
      </div>
    );
  } else {
    let apiKey = "b35a38c8a0005068396b0b0ed86da57a";
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiKey}&units=metric`;

    axios.get(forecastUrl).then(showForecast);

    return null;
  }
}
