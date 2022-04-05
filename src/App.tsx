import React from 'react';
import Header from './components/Header';
import Layout from "./components/Layout";
import { NeedsContextProvider } from "./contexts/NeedsContext";
import { NeedFormManager } from "./components/NeedForm/NeedFormManager";
import { AddedNeeds } from "./components/AddedNeeds/AddedNeeds";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: blueGrey
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Layout>
                <NeedsContextProvider>
                    <NeedFormManager/>
                    <AddedNeeds/>
                </NeedsContextProvider>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
