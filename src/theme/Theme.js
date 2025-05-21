// src/theme.js
import { createTheme } from "@mui/material/styles";

const getCustomTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#696969",
        light: "#757de8",
        dark: "#002984",
      },
      secondary: {
        main: "#f50057",
        light: "#ff4081",
        dark: "#c51162",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? "#1a1a1a" : "#fff",
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  });

export default getCustomTheme;
