import React from "react";

import "./Proverb.css";

export default function Proverb(props) {
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

  switch (props.weatherDescription.toLowerCase()) {
    case "clouds":
      return (
        <p className="proverb-section">
          <span className="proverb">
            {proverbs.clouds.saying}
            <br />
          </span>
          <span className="proverb-author">{proverbs.clouds.author}</span>
        </p>
      );
    case "snow":
      return (
        <p className="proverb-section">
          <span className="proverb">
            {proverbs.snow.saying}
            <br />
          </span>
          <span className="proverb-author">{proverbs.snow.author}</span>
        </p>
      );
    case "rain":
    case "drizzle":
      return (
        <p className="proverb-section">
          <span className="proverb">
            {proverbs.rain.saying}
            <br />
          </span>
          <span className="proverb-author">{proverbs.rain.author}</span>
        </p>
      );
    case "clear":
      return (
        <p className="proverb-section">
          <span className="proverb">
            {proverbs.sun.saying}
            <br />
          </span>
          <span className="proverb-author">{proverbs.sun.author}</span>
        </p>
      );
    case "thunderstorm":
      return (
        <p className="proverb-section">
          <span className="proverb">
            {proverbs.storm.saying}
            <br />
          </span>
          <span className="proverb-author">{proverbs.storm.author}</span>
        </p>
      );
    case "mist":
    case "fog":
      return (
        <p className="proverb-section">
          <span className="proverb">
            {proverbs.mist.saying}
            <br />
          </span>
          <span className="proverb-author">{proverbs.mist.author}</span>
        </p>
      );
    default:
      return (
        <p className="proverb-section">
          <span className="proverb">
            {proverbs.default.saying}
            <br />
          </span>
          <span className="proverb-author">{proverbs.default.author}</span>
        </p>
      );
  }
}
