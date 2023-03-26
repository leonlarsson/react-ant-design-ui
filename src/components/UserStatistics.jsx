import { useState } from "react";
import { Card, Typography, DatePicker } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Page from "./Shared/Page";
import userData from "../utils/userData";

const { Title, Text } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

const UserStatistics = () => {

  const [users, setUsers] = useState(userData);

  const averageInventoryItems = (users.map(x => x.inventory.items.length).reduce((a, b) => a + b, 0) / users.length).toFixed(0);
  const averageCurrency1 = (users.map(x => x.money.currency1).reduce((a, b) => a + b, 0) / users.length).toFixed(0);
  const averageCurrency2 = (users.map(x => x.money.currency2).reduce((a, b) => a + b, 0) / users.length).toFixed(0);
  const averagePurchases = (users.map(x => x.monetization.purchases.length).reduce((a, b) => a + b, 0) / users.length).toFixed(0);
  const averageSpend = (users.map(x => x.monetization.totalSpend).reduce((a, b) => a + b, 0) / users.length).toFixed(2);

  const spendingUsers = users.filter(x => x.monetization.hasSpentMoney).length;

  const getUsersWithinRange = dateRange => {
    if (!dateRange) return setUsers(userData);
    const [startDate, endDate] = dateRange;
    setUsers(userData.filter(user => startDate.isBefore(user.info.created) && endDate.isAfter(user.info.created)));
  }

  return (
    <Page title="User Statistics" description="Example of some data extracted from the userbase.">

      <Typography.Text style={{ marginRight: 5 }}>Show data on users created between:</Typography.Text>
      <DatePicker.RangePicker separator={<i className="fa-solid fa-arrow-right" />} onChange={getUsersWithinRange} />

      <Typography.Title level={4}>{users.length} {users.length === 1 ? "user" : "users"} loaded.</Typography.Title>

      {users.length > 0 &&
        <div className="row">

          <StatCard title="Average...">
            <Title level={5}>Inventory items: <code>{averageInventoryItems}</code></Title>
            <Title level={5}>Currency 1: <code>{averageCurrency1}</code></Title>
            <Title level={5}>Currency 2: <code>{averageCurrency2}</code></Title>
            <Title level={5}>Purchases: <code>{averagePurchases}</code></Title>
            <Title level={5}>Spend ($): <code>{averageSpend}</code></Title>
          </StatCard>

          <StatCard title="Spending users">
            <Title level={5}><code>{(spendingUsers / users.length).toLocaleString("en-US", { style: "percent", maximumFractionDigits: 1 })}</code> of users have spent money</Title>
            <Title level={5}><code>{spendingUsers.toLocaleString("en-US")}</code> spending users</Title>
            <Title level={5}><code>{(users.length - spendingUsers).toLocaleString("en-US")}</code> non-spending users</Title>
            <Doughnut data={{
              labels: ["Spending users", "Non-spending users"],
              datasets: [
                {
                  backgroundColor: ["#23a55a", "#da373c"],
                  label: " # of users",
                  data: [spendingUsers, users.length - spendingUsers],
                  hoverOffset: 7
                }
              ]
            }} />
          </StatCard>

          <StatCard title="Users are from...">
            <Text>{[...new Set(users.map(x => x.info.country))].map(country => `${country} (${users.filter(x => x.info.country === country).length})`).join(", ")}</Text>
            <br />
            <Text strong underline>That's {[...new Set(users.map(x => x.info.country))].length} different countries!</Text>
          </StatCard>

        </div>
      }

    </Page >
  );
};

const StatCard = ({ title, children }) => {
  return (
    <div className="col mb-3" style={{ minWidth: "334px" }}>
      <Card
        hoverable
        style={{ height: "100%", borderColor: "rgba(0, 21, 41, .2)", cursor: "default" }}
        title={<Typography.Text style={{ fontSize: 20 }} strong>{title}</Typography.Text>}>
        {children}
      </Card>
    </div>
  );
};

export default UserStatistics;