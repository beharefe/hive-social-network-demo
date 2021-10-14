import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { ThemeProvider, getInitialColorMode } from "./hooks/theme";
import AlertOutlet from "./components/Alert";
import { AlertProvider } from "./hooks/alert";

// get initial color mode to prevent UI flickering
document.documentElement.setAttribute("class", getInitialColorMode());

/* !!! Please check defaults and play around with differen configurations
 * !!! Defaults can be complicated at the beginning :)
 * TODO: https://react-query.tanstack.com/guides/important-defaults
*/
const queryClient = new QueryClient({});

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        {/* Add devtools here and give it a go */}
        <ReactQueryDevtools position="bottom-right" />

        <AlertProvider>
          <ThemeProvider>
            {/* Global Alert Component */}
            <AlertOutlet />

            {/* App */}
            <App />
          </ThemeProvider>
        </AlertProvider>
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
