import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Divider, Input, Skeleton, Space, Typography } from "antd";
import Page from "./Shared/Page";
import User from "./User/User";
import userData from "../utils/userData";

const UserSearch = () => {

  const [user, setUser] = useState(false);
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const search = useRef();

  const urlParams = new URLSearchParams(location.search);
  const searchParam = urlParams.get("search");
  const randomParam = urlParams.get("random");

  // Get a random user
  const getRandomUser = () => userData[Math.floor(Math.random() * userData.length)];

  // Searches for a single user, null if no result
  const searchUser = random => {
    if (simulateLoading) setLoading(true);
    setTimeout(() => {
      const user = random === true ? getRandomUser() : userData.find(user => [user.id, user.info.username.toLowerCase(), user.info.email.toLowerCase()].includes(search.current.input.value.toLowerCase().trim()));
      setUser(user ?? null);
      setLoading(false);
    }, simulateLoading ? Math.floor(Math.random() * 1000 + 300) : null)
  };

  // On load, run searchUser() if search param is there
  useEffect(() => {
    if (searchParam) return searchUser();
    if (["true", "1"].includes(randomParam)) return searchUser(true);
  }, []);

  return (
    <Page title="User Search" description={`An example UI for searching for a user. ${userData.length} fake users have been generated.`}>

      {/* USER SEARCH */}
      <Checkbox style={{ marginBottom: 5, userSelect: "none" }} defaultChecked={simulateLoading} onChange={e => setSimulateLoading(e.target.checked)}>Simulate loading</Checkbox>
      <Space.Compact size="large" block>
        <Button onClick={() => searchUser(true)}>Random</Button>
        <Input.Search enterButton="Search" autoFocus placeholder="ID / Username / Email" defaultValue={searchParam} onSearch={value => value.trim().length && searchUser(false)} ref={search} />
      </Space.Compact>

      <Divider />

      {loading ? <Skeleton active /> : user ? <User user={user} /> : user === null && <Typography.Title level={4} strong type="danger">No user found. Visit <Link to="/user-database" className="link-danger text-decoration-underline">User Database</Link> to do a partial search.</Typography.Title>}

    </Page>
  );
};

export default UserSearch;