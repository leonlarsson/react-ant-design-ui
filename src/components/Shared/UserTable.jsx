import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ExportToCsv } from "export-to-csv";
import { Button, Checkbox, Drawer, Image, Input, message, Radio, Skeleton, Space, Switch, Table, Typography } from "antd";
import User from "../User/User";
import userData from "../../utils/userData";

const UserTable = ({ tableUsers = userData }) => {

  const searchInput = useRef();
  const [tableSize, setTableSize] = useState("middle");
  const [usersToShow, setUsersToShow] = useState(tableUsers);
  const [user, setUser] = useState(null);
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [useOnInput, setUseOnInput] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter users to show in table. If simulateLoading, set the table to loading, then wait between 0 and 1 seconds, before populating table
  const filterUsers = filter => {
    if (simulateLoading) setTableLoading(true);
    setTimeout(() => {
      setUsersToShow(tableUsers.filter(user => [user.id, user.info.username.toLowerCase(), user.info.email.toLowerCase()].some(item => item.includes(filter.toLowerCase().trim()))));
      setTableLoading(false);
      setTimeout(() => searchInput.current.focus(), 0);
    }, simulateLoading ? Math.floor(Math.random() * 1000 + 300) : null);
  };

  const data = usersToShow.map(user => ({
    key: user.id,
    avatar: user.info.avatar,
    id: user.id,
    username: user.info.username,
    email: user.info.email,
    tickets: user.tickets.length,
    purchases: user.monetization.purchases.length,
    inventoryItems: user.inventory.items.length,
    currency1: user.money.currency1,
    currency2: user.money.currency2
  }));

  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      width: 1,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            style={{ marginRight: 5 }}
            icon={<i className="fa-solid fa-search" />}
            title={`Preview user ${record.username}`}
            onClick={() => {
              setUser(userData.find(user => user.id === record.id));
              setUserDrawerOpen(true);
            }} />

          <Link
            to={`/user/${record.id}`}
            title={`See full user ${record.username}`}>
            <Button icon={<i className="fa-solid fa-user" />} />
          </Link>
        </div>
      )
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: 1,
      render: avatar => <Image width={40} src={avatar} placeholder={<Skeleton.Image active style={{ width: 40, height: 40 }} />} />
    },
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username)
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email)
    },
    {
      title: "Tickets",
      dataIndex: "tickets",
      sorter: (a, b) => a.tickets - b.tickets
    },
    {
      title: "Purchases",
      dataIndex: "purchases",
      sorter: (a, b) => a.purchases - b.purchases
    },
    {
      title: "Inventory Items",
      dataIndex: "inventoryItems",
      sorter: (a, b) => a.inventoryItems - b.inventoryItems
    },
    {
      title: "Money",
      dataIndex: "money",
      render: (_, { currency1, currency2 }) => `${currency1.toLocaleString("en-US")} / ${currency2.toLocaleString("en-US")}`
    }
  ];

  const commonSearchInputProps = {
    placeholder: "ID / Username / Email",
    disabled: tableLoading,
    ref: searchInput,
    size: "large",
    allowClear: { clearIcon: <i className="fa-solid fa-circle-xmark" /> },
    autoFocus: true
  };

  return (
    <>
      <Space direction="horizontal" style={{ marginBottom: 10 }}>
        <Checkbox style={{ userSelect: "none" }} defaultChecked={simulateLoading} onChange={e => setSimulateLoading(e.target.checked)}>Simulate loading</Checkbox>
        <Switch defaultChecked={useOnInput} checkedChildren="onInput" unCheckedChildren="onSearch" onChange={setUseOnInput} />
        {useOnInput ? <Input {...commonSearchInputProps} onChange={e => filterUsers(e.target.value)} /> : <Input.Search {...commonSearchInputProps} enterButton="Search" onSearch={filterUsers} />}

        <Typography.Text>Table size:</Typography.Text>
        <Radio.Group value={tableSize} onChange={e => setTableSize(e.target.value)}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Space>

      <Table
        size={tableSize}
        columns={columns}
        dataSource={data}
        loading={tableLoading}
        bordered
        scroll={{ x: true }}
        pagination={{ hideOnSinglePage: true }}
        rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE], onChange: (_, selectedRows) => setSelectedRows(selectedRows) }}
        footer={() => (
          <Button
            icon={<i className="fa-solid fa-file-export" style={{ marginRight: 5 }} />}
            onClick={() => {
              message.info("Exporting file...");
              new ExportToCsv({ filename: "Users_Export", useKeysAsHeaders: true, showLabels: true }).generateCsv(data);
            }}
          >
            Export to CSV (ignores filter)
          </Button>
        )}
      />

      <Drawer title="User preview" width="50%" open={userDrawerOpen} onClose={() => setUserDrawerOpen(false)} extra={<Link to={`/user/${user?.id}`}><Button type="primary">View full profile</Button></Link>}>
        <User user={user} hideCardButtons={true} />
      </Drawer>

      {selectedRows.length > 0 &&
        <>
          <Typography.Title>Selected users ({selectedRows.length})</Typography.Title>
          <Table
            size={tableSize}
            columns={columns}
            dataSource={selectedRows}
            bordered
            scroll={{ x: true }}
            pagination={{ hideOnSinglePage: true }}
            footer={() => (
              <Button
                icon={<i className="fa-solid fa-file-export" style={{ marginRight: 5 }} />}
                onClick={() => {
                  message.info("Exporting file...");
                  new ExportToCsv({ filename: "Selected_Users_Export", useKeysAsHeaders: true, showLabels: true }).generateCsv(selectedRows);
                }}
              >
                Export to CSV (ignores filter)
              </Button>
            )}
          />
        </>
      }
    </>
  );
};

export default UserTable;