import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Import App instead of LoginPage
import "./index.css";  // Global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />  {/* Render the App component which contains the routing */}
  </React.StrictMode>
);
