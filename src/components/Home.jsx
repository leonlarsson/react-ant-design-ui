import { Divider, Typography } from "antd";
import { Link } from "react-router-dom";
import Page from "./Shared/Page";
import ThemeSettings from "./ThemeSettings";

const Home = () => {

  return (
    <Page title="Home" description="Welcome to a React + Ant Design example application." divider={false}>
      <Typography.Text>
        <h6>Created by <a href="https://github.com/leonlarsson" target="_blank">https://github.com/leonlarsson</a> | <a href="https://github.com/leonlarsson/react-ant-design-ui" target="_blank">source</a>.</h6>
      </Typography.Text>
      <br />

      <Typography.Title level={3}>Pages</Typography.Title>
      <Typography.Text>

        <Divider orientation="left">Users</Divider>
        <p>[DEMO]  Go to <Link to="/user-search">User Search</Link> to see a a functioning user search UI.</p>
        <p>[DEMO] Go to <Link to="/user-database">User Database</Link> to browse and search through a database of fake users.</p>
        <p>[DEMO] Go to <Link to="/user-statistics">User Statistics</Link> to see statistics for the fake users.</p>

        <Divider orientation="left">Items</Divider>
        <p>[DEMO] Go to <Link to="/item-database">Item Database</Link> to browse and search through a database of fake items.</p>
        <p>Go to <Link to="/items-2">Items 2</Link> to view Items 2.</p>

        <Divider orientation="left">Tools</Divider>
        <p>Go to <Link to="/tools-1">Tools 1</Link> to view Tools 1.</p>
        <p>Go to <Link to="/tools-2">Tools 2</Link> to view Tools 2.</p>
        <p>Go to <Link to="/tools-3">Tools 3</Link> to view Tools 3.</p>

        <Divider orientation="left">Category</Divider>
        <p>Go to <Link to="/lorem">Lorem</Link> to Lorem it up.</p>
        <p>Go to <Link to="/ipsum">Ipsum</Link> to Ipsum it up.</p>

        <h3>Search Params</h3>
        <p><code>?generateUsers=x</code> - Generate x amount of fake users. Defaults to 50. Used in <Link to="/user-search">User Search</Link>, <Link to="/user-database">User Databse</Link>, and <Link to="/user-statistics">User Statistics</Link>.</p>
        <p><code>?generateItems=x</code> - Generate x amount of fake items. Defaults to 500. Used in <Link to="/item-database">Item Database</Link>.</p>
        <p><code>?search=x</code> - Search for x on <Link to="/user-search?search=x">Search User</Link>.</p>
        <p><code>?random=true</code> - Search for a random user on <Link to="/user-search?random=true">Search User</Link>.</p>

      </Typography.Text>

      <Typography.Title level={3}>Theme settings</Typography.Title>
      <ThemeSettings />

    </Page>
  );
};

export default Home;