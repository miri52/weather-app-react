import React, { useState } from "react";
import axios from "axios";

import "./Weather.css";

export default function Weather() {
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");
  let [date, setDate] = useState("");
  let [saying, setSaying] = useState("");
  let [author, setAuthor] = useState("");

  let proverbs = {
    snow: {
      saying: "No snowflake ever falls in the wrong place.",
      author: "-Zen proverb",
    },
    rain: {
      saying: "The sound of rain needs no translation.",
      author: "-Zen proverb",
    },
    sun: {
      saying: "Turn your face to the sun and the shadows fall behind you.",
      author: "-Maori proverb",
    },
    clouds: {
      saying: "A cloudy sky doesn't always cry rain.",
      author: "-African proverb",
    },
    storm: {
      saying: "A tree with strong roots laughs at storms.",
      author: "-Malay Proverb",
    },
    mist: {
      saying: "Words are the fog one has to see through.",
      author: "-Zen proverb",
    },
    default: {
      saying: "After bad weather comes good weather.",
      author: "-Maltese Proverb",
    },
  };

  function showProverb(mainDescription) {
    switch (mainDescription) {
      case "clouds":
        setSaying(proverbs.clouds.saying);
        setAuthor(proverbs.clouds.author);
        break;
      case "snow":
        setSaying(proverbs.snow.saying);
        setAuthor(proverbs.snow.author);
        break;
      case "rain":
      case "drizzle":
        setSaying(proverbs.rain.saying);
        setAuthor(proverbs.rain.author);
        break;
      case "clear":
        setSaying(proverbs.sun.saying);
        setAuthor(proverbs.sun.author);
        break;
      case "thunderstorm":
        setSaying(proverbs.storm.saying);
        setAuthor(proverbs.storm.author);
        break;
      case "mist":
      case "fog":
        setSaying(proverbs.mist.saying);
        setAuthor(proverbs.mist.author);
        break;
      default:
        setSaying(proverbs.default.saying);
        setAuthor(proverbs.default.author);
    }
  }

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

    let mainDescription = response.data.weather[0].main;
    showProverb(mainDescription.toLowerCase());
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
                  {saying}
                  <br />
                </span>
                <span className="proverb-author">{author}</span>
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
