import { createContext, useState } from "react";
import { ConfigProvider, theme } from "antd";
import Layout from "./components/Layout";
import "./styles/App.css";

export const ThemeContext = createContext();

const App = () => {

    const [globalAntdTheme, setGlobalAntdTheme] = useState(localStorage.getItem("globalAntdTheme"));

    return (
        <ThemeContext.Provider value={setGlobalAntdTheme}>
            <ConfigProvider theme={{ algorithm: globalAntdTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
                <Layout />
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export default App;