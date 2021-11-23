import { useState, useMemo, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.component";
import Todo from "./pages/Todo.page";
import Weather from "./pages/Weather.page";
import { blue, red, grey, green, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: blue[500],
          },
          delete: {
            main: red[400],
          },
          secondary: {
            main: grey[600],
          },
          checked: {
            main: green[500],
          },
          edit: {
            main: teal[400],
            contrastText: "#fff",
          },
          darK: {
            main: grey[900],
          },
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="weather" element={<Weather />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
