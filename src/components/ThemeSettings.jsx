import { Checkbox, Space } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../App";

const ThemeSettings = () => {

    const [themeSettings, setThemeSettings] = useContext(ThemeContext);

    const handleThemeChange = (item, checked) => {
        const newTheme = { ...themeSettings, [item]: checked ? "dark" : "light" };
        setThemeSettings(newTheme);
        localStorage.setItem("themeSettings", JSON.stringify(newTheme));
    };

    return (
        <Space direction="vertical">
            <Checkbox style={{ userSelect: "none" }} checked={themeSettings.headerTheme === "dark"} onChange={e => handleThemeChange("headerTheme", e.target.checked)}>Dark header</Checkbox>
            <Checkbox style={{ userSelect: "none" }} checked={themeSettings.menuTheme === "dark"} onChange={e => handleThemeChange("menuTheme", e.target.checked)}>Dark menu</Checkbox>
            <Checkbox style={{ userSelect: "none" }} checked={themeSettings.globalTheme === "dark"} onChange={e => handleThemeChange("globalTheme", e.target.checked)}>Global dark theme</Checkbox>
        </Space>
    );
};

export default ThemeSettings;