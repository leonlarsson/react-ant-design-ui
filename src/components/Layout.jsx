import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Checkbox, Divider, Drawer, Layout, Space, Typography } from "antd";
import { handleHeaderThemeChange, handleMenuThemeChange, handleGlobalAntdThemeChange } from "../utils/handleThemeChanges";
import { ThemeContext } from "../App";
import Nav from "./Nav";
import logo from "../assets/images/logo.png";

const LayoutComponent = () => {

    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
    const [userDrawerOpen, setUserDrawerOpen] = useState(false);
    const [antdThemeHeader, setAntdThemeHeader] = useState(localStorage.getItem("antdThemeHeader"));
    const [antdThemeMenu, setAntdThemeMenu] = useState(localStorage.getItem("antdThemeMenu"));
    const setGlobalAntdTheme = useContext(ThemeContext);

    window.addEventListener("storage", () => {
        setAntdThemeHeader(localStorage.getItem("antdThemeHeader"));
        setAntdThemeMenu(localStorage.getItem("antdThemeMenu"));
        setGlobalAntdTheme(localStorage.getItem("globalAntdTheme"));
    });

    return (
        <Layout style={{ height: "100vh" }}>

            <Layout.Header style={{ display: "flex", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10, backgroundColor: antdThemeHeader === "dark" ? "#001529" : "white" }}>

                <Link to="/" style={{ display: "flex", alignItems: "center", textDecorationLine: "none", userSelect: "none" }} >
                    <img src={logo} className="me-2" alt="Brand Logo" width={40} />
                    {/* Depending on your brand name length, you might want to change the max-width in Nav.css */}
                    <Typography.Text strong id="headerTitle" style={{ fontSize: 25, color: antdThemeHeader === "dark" ? "white" : "black" }}>Brand Name</Typography.Text>
                </Link>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <i className="fa-solid fa-cog fa-2xl" style={{ marginRight: 10, cursor: "pointer", color: antdThemeHeader === "dark" ? "white" : "black" }} onClick={() => setSettingsDrawerOpen(true)} />
                    <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={() => setUserDrawerOpen(true)}>
                        <Typography.Text strong style={{ color: antdThemeHeader === "dark" ? "white" : "black" }}>Leon San José Larsson</Typography.Text>
                        <Typography.Text style={{ fontSize: "0.8rem", color: antdThemeHeader === "dark" ? "white" : "black" }}>github.com/leonlarsson</Typography.Text>
                    </div>
                </div>

            </Layout.Header>

            <Layout>
                <Layout.Sider width="250px" collapsible breakpoint="lg" theme={antdThemeMenu ?? "light"} collapsedWidth={60}>
                    <Nav antdMenuTheme={antdThemeMenu ?? "light"} />
                </Layout.Sider>

                <Layout.Content style={{ overflow: "auto" }}>
                    <div className="container mb-5">
                        <Outlet />
                    </div>
                </Layout.Content>
            </Layout>

            <Drawers
                settingsDrawerOpen={settingsDrawerOpen}
                setSettingsDrawerOpen={setSettingsDrawerOpen}
                userDrawerOpen={userDrawerOpen}
                setUserDrawerOpen={setUserDrawerOpen}
            />

        </Layout>
    );
};

const Drawers = ({ settingsDrawerOpen, setSettingsDrawerOpen, userDrawerOpen, setUserDrawerOpen }) => (
    <>
        <Drawer width="auto" title="Settings Panel" onClose={() => setSettingsDrawerOpen(false)} open={settingsDrawerOpen}>
            <Typography.Text>Various application settings can be shown here.</Typography.Text>
            <Divider />
            <Space direction="vertical">
                <Checkbox style={{ userSelect: "none" }} defaultChecked={localStorage.getItem("antdThemeHeader") === "dark"} onChange={handleHeaderThemeChange}>Dark header</Checkbox>
                <Checkbox style={{ userSelect: "none" }} defaultChecked={localStorage.getItem("antdThemeMenu") === "dark"} onChange={handleMenuThemeChange}>Dark menu</Checkbox>
                <Checkbox style={{ userSelect: "none" }} defaultChecked={localStorage.getItem("globalAntdTheme") === "dark"} onChange={handleGlobalAntdThemeChange}>Global dark theme</Checkbox>
            </Space>
        </Drawer>

        <Drawer width="auto" title="User Panel" onClose={() => setUserDrawerOpen(false)} open={userDrawerOpen} extra={<Button type="primary" danger>Log out</Button>}>
            <Space direction="vertical">
                <Typography.Text>
                    Logged in user information can be shown here.
                    <Divider />
                    Logged in as: <Typography.Text strong underline>Leon San José Larsson</Typography.Text>
                    <br />
                    Roles: <code>SYSTEM OWNER</code>, <code>MARKETING</code>
                </Typography.Text>
            </Space>
        </Drawer>
    </>
);

export default LayoutComponent;