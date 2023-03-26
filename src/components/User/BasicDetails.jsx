import { useEffect, useRef, useState } from "react";
import { Button, Card, Checkbox, Collapse, Image, Input, Modal, Space, Typography } from "antd";
import Overview from "./Shared/Overview";

const BasicDetails = ({ user, hide, hideCardButtons }) => {
  if (hide) return;
  const [modalOpen, setModalOpen] = useState(false);
  const [info, setInfo] = useState(user.info);
  const username = useRef();
  const email = useRef();
  const phone = useRef();
  const emailSub = useRef();

  // On user change, refresh info
  useEffect(() => {
    setInfo(user.info);
  }, [user]);

  const updateUser = () => {
    setInfo(prev => {
      return {
        ...prev,
        username: username.current.input.value.trim(),
        email: email.current.input.value.trim(),
        phone: phone.current.input.value.trim(),
        subscribedToEmails: emailSub.current.input.checked
      }
    });
  };

  return (
    <>
      <Overview icon="fa-solid fa-info" title="Basic Details" setModalOpen={setModalOpen} buttonText="Manage Details" hideCardButtons={hideCardButtons}>
        <Typography.Title level={5}>ID: <Typography.Text code copyable>{user.id}</Typography.Text></Typography.Title>
        <Typography.Title level={5}>Username: {info.username?.length ? <Typography.Text code copyable>{info.username}</Typography.Text> : "N/A"}</Typography.Title>
        <Typography.Title level={5}>Email: {info.email?.length ? <Typography.Text code copyable>{info.email}</Typography.Text> : "N/A"}</Typography.Title>
        <Typography.Title level={5}>Phone: {info.phone?.length ? <Typography.Text code copyable>{info.phone}</Typography.Text> : "N/A"}</Typography.Title>
        <Typography.Title level={5}>Created: <code>{user.info.created.toUTCString()}</code></Typography.Title>
        <Typography.Title level={5}>Last logged in: <code>{user.info.lastLoggedIn.toUTCString()}</code></Typography.Title>
        <Typography.Title level={5}>Country: <code>{user.info.country}</code></Typography.Title>
        <Typography.Title level={5}>Subscribed to emails: <code>{info.subscribedToEmails ? "Yes" : "No"}</code></Typography.Title>
        <Typography.Title level={5}>2FA active: <code>{info.mfaActive ? "Yes" : "No"}</code></Typography.Title>
      </Overview>

      {/* MODAL */}
      <Modal
        style={{ top: 25 }}
        title={<div style={{ fontSize: 20 }}><i className="fa-solid fa-info" /> Manage Details</div>}
        open={modalOpen}
        okText="Save"
        cancelText="Close"
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          setModalOpen(false);
          updateUser();
        }}
      >
        <div className="mb-3">
          <Space.Compact direction="vertical">
            <Image key={user.id} src={user.info.avatar} alt={`Avatar of ${user.info.username}`} />
            <Button type="primary" danger onClick={() => alert(`Removed avatar of ${user.info.username}.`)}>Remove avatar</Button>
          </Space.Compact>
        </div>

        {/* Inputs */}
        <Space style={{ width: "100%" }} direction="vertical">
          <Input
            key={`username-${user.id}`}
            addonBefore={<i className="fa-solid fa-user fa-fw" />}
            placeholder="Username"
            defaultValue={user.info.username}
            ref={username}
          />

          <Input
            key={`email-${user.id}`} addonBefore={<i className="fa-solid fa-envelope fa-fw" />}
            addonAfter={<Checkbox style={{ userSelect: "none" }} key={`check-${user.id}`} defaultChecked={user.info.subscribedToEmails} ref={emailSub}>Subscribed</Checkbox>}
            placeholder="Email"
            defaultValue={user.info.email}
            ref={email}
          />

          <Input
            key={`phone-${user.id}`}
            addonBefore={<i className="fa-solid fa-phone fa-fw" />}
            placeholder="Phone"
            defaultValue={user.info.phone}
            ref={phone}
          />

          <Collapse key={user.id}>
            <Collapse.Panel header="History">
              {user.info.history.length ?
                user.info.history.map(historyFragment => {
                  return (

                    <Card
                      key={`historyFragment-${historyFragment.date.getTime()}`}
                      style={{ marginBottom: 20, cursor: "default" }}
                      title={historyFragment.date.toUTCString()}
                      hoverable
                      type="inner"
                    >
                      <Typography.Title level={5}>Date: <code>{historyFragment.date.toUTCString()}</code></Typography.Title>
                      <Typography.Title level={5}>Username: <Typography.Text code copyable>{historyFragment.username}</Typography.Text></Typography.Title>
                      <Typography.Title level={5}>Email: <Typography.Text code copyable>{historyFragment.email}</Typography.Text></Typography.Title>
                      <Typography.Title level={5}>Phone: {historyFragment.phone?.length ? <Typography.Text code copyable>{historyFragment.phone}</Typography.Text> : "N/A"}</Typography.Title>
                    </Card>
                  )
                })
                :
                <Typography.Title level={5}>No history</Typography.Title>
              }
            </Collapse.Panel>
          </Collapse>

          <Button className="mt-2" type="primary" onClick={() => alert(`Triggered password reset email for user ${user.info.username}.\nOld password has also been invalidated.`)}>Trigger password reset</Button>
        </Space>

      </Modal>
    </>
  );
};

export default BasicDetails;