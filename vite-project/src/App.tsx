import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { themeSettings } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
// import NavBar from "./components/navbar";
import Dashboard from "./scenes/dashboard";
import NavBar from "./scenes/NavBar/index";
import Predictions from "./scenes/predictions/index";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
