import Page from "./Shared/Page";
import UserTable from "./Shared/UserTable";

const UserDatabase = () => {
  return (
    <Page title="User Database" description={<>An example user database. Data is generated in <code>/utils/userData.js</code></>}>
      <UserTable />
    </Page>
  );
};

export default UserDatabase;