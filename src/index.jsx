import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, getInitialColorMode } from "./hooks/theme";
import AlertOutlet from "./components/Alert";
import { AlertProvider } from "./hooks/alert";

// get initial color mode to prevent UI flickering
document.documentElement.setAttribute("class", getInitialColorMode());

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <ThemeProvider>
        {/* Global Alert Component */}
        <AlertOutlet />

        {/* App */}
        <App />
      </ThemeProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
