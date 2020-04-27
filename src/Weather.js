import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import Proverb from "./Proverb";
import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({ isSubmitted: false });

  function showWeather(response) {
    setWeather({
      isSubmitted: true,
      currentCity: response.data.name,
      temperature: Math.round(response.data.main.temp),
      wind: Math.round(response.data.wind.speed * 3.6),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      date: new Date(response.data.dt * 1000),
      weatherDescription: response.data.weather[0].main,
    });
  }

  let apiKey = "f39b4d69b61752ac1179fb7a3b6a8e55";
  let apiUrl = "https://api.openweathermap.org/data/2.5/";

  function getCityApiUrl(cityInput) {
    return `${apiUrl}weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  }

  function getGeoApiUrl(lat, lon) {
    return `${apiUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  }

  function showPosition(position) {
    let url = getGeoApiUrl(position.coords.latitude, position.coords.longitude);
    axios.get(url).then(showGeoCurrentWeather);
  }

  function showGeoCurrentWeather(response) {
    showWeather(response);
  }

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = getCityApiUrl(city);
    axios
      .get(url)
      .then(showWeather)
      .catch(function (error) {
        alert("City not found");
      });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div>
      <form onSubmit={handleSubmit} id="search-form" className="float-left">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <input
              onChange={updateCity}
              type="text"
              className="form-control"
              placeholder="Enter a city"
              autoComplete="off"
              autoFocus="on"
              id="search-city-input"
            />
          </div>
          <div className="col-auto">
            <input
              type="submit"
              value="Search"
              className="form-control btn btn-info"
            />
          </div>
        </div>
      </form>
      <button
        onClick={getCurrentPosition}
        type="submit"
        className="btn btn-secondary"
        id="current-location-button"
      >
        Current
      </button>
    </div>
  );

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

  if (!weather.isSubmitted) {
    return <div className="Weather">{form}</div>;
  } else {
    return (
      <div className="Weather">
        {form}
        <div>
          <h1>{weather.currentCity}</h1>
          <FormattedDate date={weather.date} />
          <h2>Now</h2>
          <div className="row">
            <div className="col">
              <div className="clearfix">
                <img
                  className="float-left weather-icon-now"
                  src={weather.iconUrl}
                  alt={weather.description}
                />
                <div className="float-left">
                  <strong className="current-temperature">
                    {weather.temperature}
                  </strong>
                  <span className="temperature-scale" id="celsius-scale">
                    °C
                  </span>
                  <span> | </span>
                  <span className="temperature-scale" id="fahrenheit-scale">
                    °F
                  </span>
                </div>
              </div>
            </div>
            <div className="col">
              <Proverb weatherDescription={weather.weatherDescription} />
            </div>
          </div>
          <div>
            <ul>
              <li id="weather-description">{weather.description}</li>
              <li>Wind: {weather.wind} km/h</li>
              <li>Humidity: {weather.humidity}%</li>
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
      </div>
    );
  }
}
