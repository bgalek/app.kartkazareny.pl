import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import { NeedsContextProvider } from "./contexts/NeedsContext";
import { NeedFormManager } from "./components/NeedForm/NeedFormManager";
import { AddedProducts } from "./components/AddedProducts/AddedProducts";
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
            <AddedProducts />
          </NeedsContextProvider>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
