import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "milligram";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render( // this is set up to make app.js work with switch, route, link, etc
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
