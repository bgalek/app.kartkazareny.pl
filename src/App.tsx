import React from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { NeedsContextProvider } from "./contexts/NeedsContext";
import { NeedFormManager } from "./components/NeedForm/NeedFormManager";
import { AddedNeeds } from "./components/AddedNeeds/AddedNeeds";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blue, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "24px 16px" }}>
        <Header />
        <CssBaseline />
        <Layout>
          <NeedsContextProvider>
            <NeedFormManager />
            <AddedNeeds />
          </NeedsContextProvider>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
