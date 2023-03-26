import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import "../styles/Nav.css";

const Nav = ({ antdMenuTheme }) => {

    const location = useLocation();

    const items = [
        {
            label: <Link to="/" className="navLink">Home</Link>,
            key: "/",
            icon: <i className="fa-solid fa-house fa-fw" />
        },
        {
            label: "Users",
            key: "users",
            icon: <i className="fa-solid fa-user fa-fw" />,
            children: [
                {
                    label: <Link to="/user-search" className="navLink">User Search</Link>,
                    key: "/user-search",
                    icon: <i className="fa-solid fa-magnifying-glass fa-fw" />
                },
                {
                    label: <Link to="/user-database" className="navLink">User Database</Link>,
                    key: "/user-database",
                    icon: <i className="fa-solid fa-database fa-fw" />
                },
                {
                    label: <Link to="/user-statistics" className="navLink">User Statistics</Link>,
                    key: "/user-statistics",
                    icon: <i className="fa-solid fa-gauge fa-fw" />
                }
            ]
        },
        {
            label: "Items",
            key: "items",
            icon: <i className="fa-solid fa-box fa-fw" />,
            children: [
                {
                    label: <Link to="/item-database" className="navLink">Item Database</Link>,
                    key: "/item-database",
                    icon: <i className="fa-solid fa-database fa-fw" />
                },
                {
                    label: <Link to="/items-2" className="navLink">Items 2</Link>,
                    key: "/items-2",
                    icon: <i className="fa-solid fa-circle-question fa-fw" />
                }
            ]
        },
        {
            label: "Tools",
            key: "tools",
            icon: <i className="fa-solid fa-toolbox fa-fw" />,
            children: [
                {
                    label: <Link to="/tools-1" className="navLink">Tools 1</Link>,
                    key: "/tools-1",
                    icon: <i className="fa-solid fa-circle-question fa-fw" />
                },
                {
                    label: <Link to="/tools-2" className="navLink">Tools 2</Link>,
                    key: "/tools-2",
                    icon: <i className="fa-solid fa-circle-question fa-fw" />
                },
                {
                    label: <Link to="/tools-3" className="navLink">Tools 3</Link>,
                    key: "/tools-3",
                    icon: <i className="fa-solid fa-circle-question fa-fw" />
                }
            ]
        },
        {
            label: "Category",
            key: "category",
            icon: <i className="fa-solid fa-folder-tree fa-fw" />,
            children: [
                {
                    label: <Link to="/lorem" className="navLink">Lorem</Link>,
                    key: "/lorem",
                    icon: <i className="fa-solid fa-circle-question fa-fw" />
                },
                {
                    label: <Link to="/ipsum" className="navLink">Ipsum</Link>,
                    key: "/ipsum",
                    icon: <i className="fa-solid fa-circle-question fa-fw" />
                }
            ]
        }
    ];


    return <Menu
        style={{ userSelect: "none" }}
        theme={antdMenuTheme}
        mode="inline"
        items={items}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={[items.find(item => item.children?.find(y => y.key === location.pathname))?.key]}
    />
};

export default Nav;