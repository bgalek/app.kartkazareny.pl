import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { NeedsContextProvider } from "./contexts/NeedsContext";
import { NeedFormManager } from "./components/NeedForm/NeedFormManager";
import { AddedNeeds } from "./components/AddedNeeds/AddedNeeds";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <Header />
        <CssBaseline />
        <Layout>
          <NeedsContextProvider>
            <NeedFormManager />
            <AddedNeeds />
          </NeedsContextProvider>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
