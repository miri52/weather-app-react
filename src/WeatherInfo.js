import React from "react";
import FormattedDate from "./FormattedDate";
import Proverb from "./Proverb";
import CurrentTemperature from "./CurrentTemperature";

export default function WeatherInfo(props) {
  let forecast = (
    <div className="col next-hours">
      <h3 className="time">15:00</h3>
      <img className="weather-icons" src="" alt="" />
      <div className="temperature">
        <span className="max-temperature">7°</span>
        <span className="min-temperature">5°</span>
      </div>
    </div>
  );

  return (
    <div className="WeatherInfo">
      <h1>{props.info.currentCity}</h1>
      <FormattedDate date={props.info.date} />
      <h2>Now</h2>
      <div className="row">
        <div className="col">
          <div className="clearfix">
            <img
              className="float-left weather-icon-now"
              src={props.info.iconUrl}
              alt={props.info.description}
            />
            <div className="float-left">
              <CurrentTemperature celsiusTemperature={props.info.temperature} />
            </div>
          </div>
        </div>
        <div className="col">
          <Proverb weatherDescription={props.info.weatherDescription} />
        </div>
      </div>
      <div>
        <ul>
          <li id="weather-description">{props.info.description}</li>
          <li>Wind: {props.info.wind} km/h</li>
          <li>Humidity: {props.info.humidity}%</li>
        </ul>
      </div>
      <div className="row" id="forecast">
        {forecast}
        {forecast}
        {forecast}
        {forecast}
        {forecast}
      </div>
    </div>
  );
}
