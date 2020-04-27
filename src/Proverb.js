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
    dust: {
      saying: "Gather dust to build a mountain.",
      author: "-Korean proverb",
    },
    smoke: {
      saying: "Smoke never rises without fire",
      author: "-Haitian proverb",
    },
    sand: {
      saying: "Knowledge without wisdom is like water in the sand",
      author: "-Guinean proverb ",
    },
  };

  const proverbMapping = {
    snow: proverbs.snow,
    clouds: proverbs.clouds,
    clear: proverbs.sun,
    rain: proverbs.rain,
    drizzle: proverbs.rain,
    thunderstorn: proverbs.storm,
    squall: proverbs.storm,
    tornado: proverbs.storm,
    mist: proverbs.mist,
    fog: proverbs.mist,
    haze: proverbs.mist,
    dust: proverbs.dust,
    smoke: proverbs.smoke,
    ash: proverbs.smoke,
    sand: proverbs.sand,
  };

  return (
    <p className="proverb-section">
      <span className="proverb">
        {proverbMapping[props.weatherDescription.toLowerCase()].saying}
        <br />
      </span>
      <span className="proverb-author">
        {proverbMapping[props.weatherDescription.toLowerCase()].author}
      </span>
    </p>
  );
}
