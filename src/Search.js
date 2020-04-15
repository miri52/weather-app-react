import React, { useState } from "react";
import axios from "axios";

import "./Search.css";

export default function Search() {
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");

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
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "f39b4d69b61752ac1179fb7a3b6a8e55";
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
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        onChange={updateCity}
        placeholder="Enter a city"
        autoComplete="off"
        autoFocus="on"
      />
      <input type="submit" value="Search" />
    </form>
  );

  if (!isSubmitted) {
    return form;
  } else {
    return (
      <div>
        {form}
        <ul>
          <li className="city">{weather.currentCity}</li>
          <li>{weather.temperature}°C</li> <li>Wind: {weather.wind} km/h</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>{weather.description}</li>
          <li>
            {" "}
            <img src={weather.iconUrl} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  }
}
