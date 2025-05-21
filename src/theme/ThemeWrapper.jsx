// src/components/ThemeWrapper.jsx
import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getCustomTheme from "./Theme";
import ThemeContext from "./ThemeContext";

const ThemeWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // toggle this later if needed

  const theme = getCustomTheme(darkMode);

  return (
  <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
