import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AudioProvider } from "./contexts/AudioContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
