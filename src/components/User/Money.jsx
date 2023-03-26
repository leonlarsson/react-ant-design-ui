import { useEffect, useRef, useState } from "react";
import { Button, Card, InputNumber, Modal, Space, Typography } from "antd";
import Overview from "./Shared/Overview";

const Money = ({ user, hide, hideCardButtons }) => {
  if (hide) return;
  const [modalOpen, setModalOpen] = useState(false);
  const [money, setMoney] = useState(user.money);
  const currency1 = useRef();
  const currency2 = useRef();

  // On user change, refresh money
  useEffect(() => {
    setMoney(user.money);
  }, [user]);

  const updateMoney = () => {
    setMoney({
      currency1: parseInt(currency1.current.value),
      currency2: parseInt(currency2.current.value)
    });
  };

  return (
    <>
      <Overview icon="fa-solid fa-coins" title="Money" setModalOpen={setModalOpen} buttonText="Manage Money" hideCardButtons={hideCardButtons}>
        <Typography.Title level={5}>Currency 1: <code>{money.currency1.toLocaleString("en-US")}</code></Typography.Title>
        <Typography.Title level={5}>Currency 2: <code>{money.currency2.toLocaleString("en-US")}</code></Typography.Title>
      </Overview>

      {/* MODAL */}
      <Modal
        style={{ top: 25 }}
        title={<div style={{ fontSize: 20 }}><i className="fa-solid fa-coins" /> Manage Money</div>}
        open={modalOpen}
        okText="Save"
        cancelText="Close"
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          setModalOpen(false);
          updateMoney();
        }}
      >
        <Typography.Title level={5}>Currency 1: <code>{money.currency1.toLocaleString("en-US")}</code></Typography.Title>
        <Typography.Title level={5}>Currency 2: <code>{money.currency2.toLocaleString("en-US")}</code></Typography.Title>

        <Card
          style={{ marginBottom: 20, cursor: "default" }}
          type="inner"
          hoverable
          title="Edit Currency 1"
        >
          <Space style={{ width: "100%" }} direction="vertical">
            <InputNumber style={{ width: "100%" }} key={money.currency1} min={0} max={999999999} addonBefore={<i className="fa-solid fa-coins" />} placeholder="Enter an amount" defaultValue={money.currency1} ref={currency1} />
            <Space>
              <Button type="primary" icon={<i className="fa-solid fa-plus" />} title="Add 100 Currency 1." onClick={() => currency1.current.value = parseInt(currency1.current.value) + 100}>100</Button>
              <Button type="primary" danger icon={<i className="fa-solid fa-minus" />} title="Remove 100 Currency 1." onClick={() => currency1.current.value = currency1.current.value <= 100 ? 0 : parseInt(currency1.current.value) - 100}>100</Button>
            </Space>
          </Space>
        </Card>

        <Card
          style={{ marginBottom: 20, cursor: "default" }}
          type="inner"
          hoverable
          title="Edit Currency 2"
        >
          <Space style={{ width: "100%" }} direction="vertical">
            <InputNumber style={{ width: "100%" }} key={money.currency2} min={0} max={999999999} addonBefore={<i className="fa-solid fa-coins" />} placeholder="Enter an amount" defaultValue={money.currency2} ref={currency2} />
            <Space>
              <Button type="primary" icon={<i className="fa-solid fa-plus" />} title="Add 100 Currency 2." onClick={() => currency2.current.value = parseInt(currency2.current.value) + 100}>100</Button>
              <Button type="primary" danger icon={<i className="fa-solid fa-minus" />} title="Remove 100 Currency 2." onClick={() => currency2.current.value = currency2.current.value <= 100 ? 0 : parseInt(currency2.current.value) - 100}>100</Button>
            </Space>
          </Space>
        </Card>
      </Modal>
    </>
  );
};

export default Money;