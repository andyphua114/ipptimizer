import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactGA from "react-ga4";

ReactGA.initialize("G-FR1T1MD08D");
ReactGA.send({ hitType: "pageview", page: "/" }); // Track the initial page load

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
