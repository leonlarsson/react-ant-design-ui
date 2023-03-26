import { Link, useParams } from "react-router-dom";
import { Typography } from "antd";
import userData from "../../utils/userData";
import BasicDetails from "./BasicDetails";
import Money from "./Money";
import Inventory from "./Inventory";
import Monetization from "./Monetization";
import Tickets from "./Tickets";

const User = ({ user, hideCardButtons }) => {

  // If id param is present, try to override the user search with that
  const { id } = useParams();
  if (id) {
    user = userData.find(x => x.id === id);
    if (!user) return <div className="mt-3">
      <Typography.Title level={5}><Link to="/user-search">To User Search</Link></Typography.Title>
      <Typography.Title className="text-danger">No user found with id {id}</Typography.Title>
    </div>
  };

  return (
    <div className={id && "mt-3"}>
      {id && <Typography.Title level={5}><Link to="/user-search">To User Search</Link></Typography.Title>}
      <Typography.Title level={2}>{user.info.username}</Typography.Title>
      <Typography.Title level={5}>ID: {user.id}</Typography.Title>
      <div className="row">
        <BasicDetails user={user} hideCardButtons={hideCardButtons} />
        <Money user={user} hideCardButtons={hideCardButtons} />
        <Inventory user={user} hideCardButtons={hideCardButtons} />
        <Monetization user={user} hideCardButtons={hideCardButtons} />
        <Tickets user={user} hideCardButtons={hideCardButtons} />
      </div>
    </div>
  );
};

export default User;