import { Checkbox, Space } from "antd";
import { handleGlobalAntdThemeChange, handleHeaderThemeChange, handleMenuThemeChange } from "../utils/handleThemeChanges";

const ThemeSettings = () => {
    return (
        <Space direction="vertical">
            <Checkbox style={{ userSelect: "none" }} defaultChecked={localStorage.getItem("antdThemeHeader") === "dark"} onChange={handleHeaderThemeChange}>Dark header</Checkbox>
            <Checkbox style={{ userSelect: "none" }} defaultChecked={localStorage.getItem("antdThemeMenu") === "dark"} onChange={handleMenuThemeChange}>Dark menu</Checkbox>
            <Checkbox style={{ userSelect: "none" }} defaultChecked={localStorage.getItem("globalAntdTheme") === "dark"} onChange={handleGlobalAntdThemeChange}>Global dark theme</Checkbox>
        </Space>
    );
};

export default ThemeSettings;