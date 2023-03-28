import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Divider, Drawer, Layout, Space, Typography } from "antd";
import { ThemeContext } from "../App";
import Nav from "./Nav";
import ThemeSettings from "./ThemeSettings";

const LayoutComponent = () => {

    const [themeSettings] = useContext(ThemeContext);
    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
    const [userDrawerOpen, setUserDrawerOpen] = useState(false);

    return (
        <Layout style={{ height: "100vh" }}>

            <Layout.Header style={{ display: "flex", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10, backgroundColor: themeSettings?.headerTheme === "dark" ? "#001529" : "white" }}>

                <Link to="/" style={{ display: "flex", alignItems: "center", textDecorationLine: "none", userSelect: "none" }} >
                    <img src="/assets/images/logo.png" className="me-2" alt="Brand Logo" width={40} />
                    {/* Depending on your brand name length, you might want to change the max-width in Nav.css */}
                    <Typography.Text strong id="headerTitle" style={{ fontSize: 25, color: themeSettings?.headerTheme === "dark" ? "white" : "black" }}>Brand Name</Typography.Text>
                </Link>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <i className="fa-solid fa-cog fa-2xl" style={{ marginRight: 10, cursor: "pointer", color: themeSettings?.headerTheme === "dark" ? "white" : "black" }} onClick={() => setSettingsDrawerOpen(true)} />
                    <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={() => setUserDrawerOpen(true)}>
                        <Typography.Text strong style={{ color: themeSettings?.headerTheme === "dark" ? "white" : "black" }}>Leon San José Larsson</Typography.Text>
                        <Typography.Text style={{ fontSize: "0.8rem", color: themeSettings?.headerTheme === "dark" ? "white" : "black" }}>github.com/leonlarsson</Typography.Text>
                    </div>
                </div>

            </Layout.Header>

            <Layout>
                <Layout.Sider width="250px" collapsible breakpoint="lg" theme={themeSettings?.menuTheme ?? "light"} collapsedWidth={60}>
                    <Nav antdMenuTheme={themeSettings?.menuTheme ?? "light"} />
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
            <ThemeSettings />
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