import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { AudioProvider } from "./contexts/AudioContext";
import store from "~/redux/store";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AudioProvider>
          <App />
        </AudioProvider>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
