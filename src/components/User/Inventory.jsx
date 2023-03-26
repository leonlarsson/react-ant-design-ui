import { useEffect, useState } from "react";
import { Button, Card, Collapse, InputNumber, Modal, Popconfirm, Select, Space, Typography } from "antd";
import Overview from "./Shared/Overview";
import SelectTimeAndDate from "../Shared/SelectTimeAndDate";
import itemData, { itemRarities } from "../../utils/itemData";

const Inventory = ({ user, hide, hideCardButtons }) => {
  if (hide) return;
  const [modalOpen, setModalOpen] = useState(false);
  const [useScheduled, setUseScheduled] = useState(false);
  const [items, setItems] = useState(user.inventory.items);
  const [selectedItem, setSelectedItem] = useState(itemData[0]);
  const [selectedItemRarity, setSelectedItemRarity] = useState("Rarity 1");

  // On user change, refresh items
  useEffect(() => {
    setItems(user.inventory.items);
  }, [user]);

  return (
    <>
      <Overview icon="fa-solid fa-boxes-stacked" title="Inventory" setModalOpen={setModalOpen} buttonText="Manage Inventory" hideCardButtons={hideCardButtons}>
        {items.length ? items.slice(0, 5).map(item => <Typography.Title level={5} key={item.id}>{item.rarity ? `[${item.rarity}]` : ""} {item.name}</Typography.Title>) : <Typography.Title level={5}>No items</Typography.Title>}
        {items.length > 5 && <Typography.Title level={5} underline>And {items.length - 5} more...</Typography.Title>}
      </Overview>

      {/* MODAL */}
      <Modal
        style={{ top: 25 }}
        title={<div style={{ fontSize: 20 }}><i className="fa-solid fa-boxes-stacked" /> Manage Inventory</div>}
        open={modalOpen}
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
      >
        {items.length ? items.map(item => {
          return (
            <Card
              key={item.id}
              style={{ marginBottom: 20, cursor: "default" }}
              type="inner"
              hoverable
              title={item.name}
              extra={
                <Popconfirm title="Remove item" description="Are you sure you want to remove this item?" okText="Yes" onConfirm={() => setItems(prev => prev.filter(x => x.id !== item.id))}>
                  <Button type="primary" danger>Remove</Button>
                </Popconfirm>
              }>
              <Typography.Title level={5}>Item ID: <code>{item.id}</code></Typography.Title>
              <Typography.Title level={5}>Item Name: <code>{item.name}</code></Typography.Title>
              <Typography.Title level={5}>Item Rarity: <code>{item.rarity ?? "N/A"}</code></Typography.Title>

            </Card>
          );
        }) : <Typography.Title level={5}>No items in inventory</Typography.Title>}

        {/* ADD ITEM COLLAPSE */}

        <Collapse key={user.id}>
          <Collapse.Panel header="Add...">
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                style={{ width: "100%" }}
                placeholder="Select item"
                defaultValue={itemData[0].id}
                options={itemData.map(item => ({ value: item.id, label: `${item.name} (${item.id})` }))}
                onChange={id => setSelectedItem(itemData.find(x => x.id === id))}
              />

              <Select
                style={{ width: "100%" }}
                placeholder="Select rarity"
                defaultValue="Rarity 1"
                options={itemRarities.map(x => ({ value: x, label: x }))}
                onChange={setSelectedItemRarity}
              />

              <InputNumber
                style={{ width: "100%" }}
                addonBefore="Amount"
                max={9999}
                min={1}
                defaultValue={1}
                placeholder="Example item amount"
              />

              <SelectTimeAndDate state={{ useScheduled, setUseScheduled }} />

              <Button type="primary" style={{ marginTop: 10 }} onClick={() => setItems(prev => [...prev, { id: crypto.randomUUID(), name: selectedItem.name, rarity: selectedItemRarity }])}>Add item</Button>
            </Space>
          </Collapse.Panel>
        </Collapse>

      </Modal>
    </>
  );
};

export default Inventory;