import { useEffect, useState } from "react";
import { Button, Card, Modal, Popconfirm, Typography } from "antd";
import Overview from "./Shared/Overview";

const Monetization = ({ user, hide, hideCardButtons }) => {
  if (hide) return;
  const [modalOpen, setModalOpen] = useState(false);
  const [purchases, setPurchases] = useState(user.monetization.purchases);

  // On user change, refresh purchases
  useEffect(() => {
    setPurchases(user.monetization.purchases);
  }, [user]);

  return (
    <>
      <Overview icon="fa-solid fa-dollar-sign" title="Monetization" setModalOpen={setModalOpen} buttonText="Manage Monetization" hideCardButtons={hideCardButtons}>
        <Typography.Title level={5}>Has spent money: <code>{user.monetization.hasSpentMoney ? "Yes" : "No"}</code></Typography.Title>
        <Typography.Title level={5}>Total spend ($): <code>{user.monetization.totalSpend}</code></Typography.Title>
        <Typography.Title level={4} underline>Purchases ({purchases.length}):</Typography.Title>
        {purchases.length ? purchases.slice(0, 3).map(purchase => <Typography.Title level={5} key={purchase.id}>[{purchase.source}] {purchase.itemName}</Typography.Title>) : <Typography.Title level={5}>No purchases</Typography.Title>}
        {purchases.length > 3 && <Typography.Title level={5} underline>And {purchases.length - 3} more...</Typography.Title>}
      </Overview>

      {/* MODAL */}
      <Modal
        style={{ top: 25 }}
        title={<div style={{ fontSize: 20 }}><i className="fa-solid fa-dollar-sign" /> Manage Monetization</div>}
        open={modalOpen}
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
      >
        {purchases.length ? purchases.map(purchase => {
          return (
            <Card
              key={purchase.id}
              style={{ marginBottom: 20, cursor: "default" }}
              type="inner"
              hoverable
              title={purchase.itemName}
              extra={
                <Popconfirm title="Remove purchase" description="Are you sure you want to remove this purchase?" okText="Yes" onConfirm={() => setPurchases(prev => prev.filter(x => x.id !== purchase.id))}>
                  <Button type="primary" danger>Remove</Button>
                </Popconfirm>
              }>
              <Typography.Title level={5}>Purchase ID: <code>{purchase.id}</code></Typography.Title>
              <Typography.Title level={5}>Date: <code>{purchase.date.toUTCString()}</code></Typography.Title>
              <Typography.Title level={5}>IP: <code>{purchase.ip}</code></Typography.Title>
              <Typography.Title level={5}>Source: <code>{purchase.source}</code></Typography.Title>
              <Typography.Title level={5}>Item Name & ID: <code>{purchase.itemName} ({purchase.itemId})</code></Typography.Title>
            </Card>
          );
        }) : <Typography.Title level={5}>No purchases</Typography.Title>}
      </Modal>
    </>
  );
};

export default Monetization;