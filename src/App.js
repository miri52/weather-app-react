import React from "react";
import "./App.css";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <div className="container">
        <section className="wireframe">
          <Search />
        </section>
        <p class="open-source">
          <a
            href="https://github.com/miri52/weather-app-react"
            rel="noopener noreferrer"
            target="_blank"
          >
            Open-source code{" "}
          </a>
          by Miriama Svítková
        </p>
      </div>
    </div>
  );
}

export default App;
