import React from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { NeedsContextProvider } from "./contexts/NeedsContext";
import { NeedFormManager } from "./components/NeedForm/NeedFormManager";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blue, indigo } from "@mui/material/colors";
import { SendNeeds } from "./components/SendNeeds";
import { NeedsList } from "./components/NeedsList/NeedsList";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    action: {
      disabledBackground: "#E0E0E0",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "24px 16px", overflowx: "hidden" }}>
        <Header />
        <CssBaseline />
        <main>
          <NeedsContextProvider>
            <Layout>
              <NeedFormManager />
              <NeedsList />
            </Layout>
            <Layout
              className="sticky-portal"
              sx={{ position: "sticky", bottom: "24px" }}
            >
              <SendNeeds />
            </Layout>
          </NeedsContextProvider>
        </main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
