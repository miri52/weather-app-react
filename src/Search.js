import React, { useState } from "react";
import axios from "axios";

import "./Search.css";

let apiKey = "f39b4d69b61752ac1179fb7a3b6a8e55";

export default function Search() {
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");
  let [date, setDate] = useState("");

  function formatDate(timestamp) {
    let now = new Date(timestamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[now.getDay()];
    return `${day} ${formatHours(timestamp)}`;
  }

  function formatHours(timestamp) {
    let now = new Date(timestamp);
    let hours = now.getHours();
    let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
    return `${hours}:${minutes}`;
  }

  function showWeather(response) {
    setIsSubmitted(true);
    setWeather({
      currentCity: response.data.name,
      temperature: Math.round(response.data.main.temp),
      wind: Math.round(response.data.wind.speed * 3.6),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setDate(formatDate(response.data.dt * 1000));
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
        type="submit"
        class="btn btn-secondary"
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

  if (!isSubmitted) {
    return <div className="Search">{form}</div>;
  } else {
    return (
      <div className="Search">
        {form}
        <div>
          <h1>{weather.currentCity}</h1>
          <p id="last-updated">Last updated: {date} </p>
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
              <p className="proverb-section">
                <span className="proverb">
                  Turn your face to the sun and the shadows fall behind you.
                  <br />
                </span>
                <span className="proverb-author">-Maori proverb</span>
              </p>
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
