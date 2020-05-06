import React, { useState } from "react";
import axios from "axios";
import CurrentWeatherInfo from "./CurrentWeatherInfo";
import WeatherForecast from "./WeatherForecast";
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

  let apiKey = "b35a38c8a0005068396b0b0ed86da57a";
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
      <form onSubmit={handleSubmit} className="float-left search-form">
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

  if (weather.isSubmitted) {
    console.log("Been here");
    return (
      <div className="Weather">
        {form}
        <CurrentWeatherInfo info={weather} />
        <WeatherForecast city={weather.currentCity} />
      </div>
    );
  } else {
    return <div className="Weather">{form}</div>;
  }
}
