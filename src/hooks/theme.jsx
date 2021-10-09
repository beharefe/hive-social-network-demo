import React, { useState, useEffect, useContext } from "react";

export function getInitialColorMode() {
  const persistedColorPreference = window.localStorage.getItem("color-mode");
  const hasPersistedPreference = typeof persistedColorPreference === "string";
  // If the user has explicitly chosen light or dark,
  // let's use it. Otherwise, this value will be null.
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }
  // If they haven't been explicit, let's check the media
  // query
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const hasMediaQueryPreference = typeof mql.matches === "boolean";
  if (hasMediaQueryPreference) {
    return mql.matches ? "dark" : "light";
  }
  // If they are using a browser/OS that doesn't support
  // color themes, let's default to 'light'.
  return "light";
}

export function setDocumentColorMode(colorMode) {
  document.documentElement.setAttribute("class", colorMode);
}

const ThemeContext = React.createContext({
  colorMode: undefined, // light | dark | undefined (system's default),
  setColorMode: () => null,
});

const ThemeProvider = ({ children }) => {
  const [colorMode, setColorModeState] = useState();

  useEffect(() => {
    setColorModeState(getInitialColorMode());
  }, []);

  const setColorMode = (value) => {
    setDocumentColorMode(value);
    setColorModeState(value);
    window.localStorage.setItem("color-mode", value);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
