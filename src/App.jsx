import { createContext, useState } from "react";
import { ConfigProvider, theme } from "antd";
import Layout from "./components/Layout";
import "./styles/App.css";

export const ThemeContext = createContext();

const App = () => {

    let themeSettings;
    try {
        themeSettings = JSON.parse(localStorage.getItem("themeSettings"));
    } catch {
        themeSettings = {};
    }

    return (
        <ThemeContext.Provider value={useState(themeSettings)}>
            <ConfigProvider theme={{ algorithm: themeSettings?.globalTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
                <Layout />
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export default App;